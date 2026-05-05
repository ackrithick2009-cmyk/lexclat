#!/usr/bin/env node
/**
 * Orchestrator — The glue that connects all 3 agents:
 *
 *   Planner (Gemini)  →  Builder (Claude)  →  Tester (MCP)
 *                              ↑________________________|
 *                                  (feedback loop)
 *
 * Usage:
 *   tsx src/orchestrator.ts [--demo] [--plan path/to/plan.md] [--max-retries 3]
 *
 * Environment Variables:
 *   ANTHROPIC_API_KEY  — required for Builder Agent
 *   WORKSPACE_PATH     — path to the workspace root (default: parent dir)
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { MCPClient } from "./mcpClient.js";
import { BuilderAgent, type GeneratedFile } from "./builderAgent.js";
import { FileWriter } from "./fileWriter.js";
import { TesterAgent } from "./testerAgent.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── CLI Args ─────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isDemo = args.includes("--demo");
const planIndex = args.indexOf("--plan");
const planPath = planIndex !== -1 ? args[planIndex + 1] : null;
const retriesIndex = args.indexOf("--max-retries");
const maxRetries = retriesIndex !== -1 ? parseInt(args[retriesIndex + 1]) : 3;

// ─── Demo Plan ────────────────────────────────────────────────────────────────

const DEMO_PLAN = `
# Calculator Implementation Plan

## Goal
Create a simple calculator module with unit tests.

## Files to Create

### \`demo-output/calculator.ts\`
Export a \`Calculator\` class with the following methods:
- \`add(a: number, b: number): number\`
- \`subtract(a: number, b: number): number\`
- \`multiply(a: number, b: number): number\`
- \`divide(a: number, b: number): number\` — throws Error if b === 0

### \`demo-output/calculator.test.ts\`
Write unit tests using Node's built-in \`assert\` module (no external test framework).
Test all 4 operations including the divide-by-zero error case.
Include a simple test runner that logs ✓ or ✗ for each test and exits with code 1 on failure.

## Tech Notes
- Use TypeScript ESM syntax (import/export)
- No external dependencies
`;

// ─── Logger ───────────────────────────────────────────────────────────────────

function log(stage: string, msg: string) {
  const ts = new Date().toISOString();
  console.log(`[${ts}] [${stage}] ${msg}`);
}

function separator(title: string) {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`${"─".repeat(60)}\n`);
}

// ─── Main Orchestration Loop ──────────────────────────────────────────────────

async function orchestrate() {
  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (!anthropicKey) {
    console.error(
      "[Orchestrator] ERROR: ANTHROPIC_API_KEY is not set.\n" +
        "Copy agent-orchestrator/.env.example to .env and fill in your key."
    );
    process.exit(1);
  }

  // ── Load Implementation Plan ───────────────────────────────────────────────
  let implementationPlan: string;

  if (isDemo) {
    log("Orchestrator", "Running in DEMO mode (calculator task).");
    implementationPlan = DEMO_PLAN;
  } else if (planPath) {
    log("Orchestrator", `Loading plan from: ${planPath}`);
    implementationPlan = await fs.readFile(path.resolve(planPath), "utf-8");
  } else {
    // Default: load the implementation_plan.md from the conversation artifacts
    const defaultPlan = path.join(__dirname, "..", "..", "..", ".gemini", "antigravity", "brain", "b618ea26-44d5-48af-96ef-577e90e33202", "implementation_plan.md");
    try {
      implementationPlan = await fs.readFile(defaultPlan, "utf-8");
      log("Orchestrator", `Loaded default implementation plan.`);
    } catch {
      console.error("[Orchestrator] No plan found. Use --demo or --plan <path>");
      process.exit(1);
    }
  }

  // ── Initialize Agents ──────────────────────────────────────────────────────
  separator("Phase 1: Initializing Agents");

  const workspacePath =
    process.env.WORKSPACE_PATH ?? path.join(__dirname, "..", "..");

  const mcp = new MCPClient();
  await mcp.connect(workspacePath);

  const builder = new BuilderAgent(anthropicKey);
  const writer = new FileWriter(mcp);
  const tester = new TesterAgent(
    mcp,
    isDemo ? "node demo-output/calculator.test.ts" : "npm run test",
    isDemo ? "." : "."
  );

  log("Orchestrator", `Workspace: ${workspacePath}`);
  log("Orchestrator", "All agents initialized.");

  let generatedFiles: GeneratedFile[] = [];
  let attempt = 0;
  let success = false;

  try {
    // ── Phase 2: Build ───────────────────────────────────────────────────────
    separator("Phase 2: Builder Agent — Generating Code");
    log("Builder", "Sending implementation plan to Claude...");

    const buildResult = await builder.buildFromPlan(implementationPlan);
    log("Builder", `Summary: ${buildResult.summary}`);
    log("Builder", `Generated ${buildResult.files.length} file(s).`);

    generatedFiles = buildResult.files;
    await writer.writeFiles(generatedFiles);

    // ── Phase 3+4: Test & Feedback Loop ─────────────────────────────────────
    separator("Phase 3: Tester Agent — Running Tests");

    while (attempt <= maxRetries) {
      log("Tester", `Attempt ${attempt + 1} / ${maxRetries + 1}`);

      const testResult = await tester.runTests();
      console.log("[Tester] Output:\n", testResult.rawOutput.slice(0, 1000));

      if (testResult.passed) {
        log("Tester", "✅ All tests passed!");
        success = true;
        break;
      }

      if (attempt >= maxRetries) {
        log("Orchestrator", `❌ Max retries (${maxRetries}) reached. Giving up.`);
        break;
      }

      // ── Phase 4: Feedback Loop ─────────────────────────────────────────────
      separator(`Phase 4: Feedback Loop — Fix Attempt ${attempt + 1}`);
      log("Orchestrator", "Sending failure feedback to Builder Agent...");

      const fixResult = await builder.fixFromFeedback(
        testResult.feedback,
        generatedFiles
      );

      log("Builder", `Fix summary: ${fixResult.summary}`);
      log("Builder", `Patched ${fixResult.files.length} file(s).`);

      // Merge patched files into generatedFiles
      for (const patched of fixResult.files) {
        const idx = generatedFiles.findIndex((f) => f.path === patched.path);
        if (idx !== -1) {
          generatedFiles[idx] = patched;
        } else {
          generatedFiles.push(patched);
        }
      }

      await writer.writeFiles(fixResult.files);
      attempt++;
    }
  } finally {
    await mcp.disconnect();
  }

  // ── Phase 5: Final Report ──────────────────────────────────────────────────
  separator("Phase 5: Orchestration Complete");
  console.log(`Status   : ${success ? "✅ SUCCESS" : "❌ FAILED"}`);
  console.log(`Attempts : ${attempt + 1}`);
  console.log(`Files    : ${generatedFiles.map((f) => f.path).join(", ")}`);

  if (!success) process.exit(1);
}

orchestrate().catch((err) => {
  console.error("[Orchestrator] Fatal error:", err);
  process.exit(1);
});
