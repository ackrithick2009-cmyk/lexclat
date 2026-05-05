/**
 * Tester Agent — uses the MCP Client to run tests in the workspace and
 * interprets the results using Gemini (or simple heuristics).
 *
 * Returns a structured result indicating pass/fail and a feedback prompt
 * for the Builder Agent if there are failures.
 */

import type { MCPClient } from "./mcpClient.js";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TestResult {
  passed: boolean;
  summary: string;         // human-readable summary
  feedback: string;        // prompt to send back to Builder if failed
  rawOutput: string;
}

// ─── Heuristics for determining pass/fail ────────────────────────────────────

const FAILURE_PATTERNS = [
  /\b(error|fail|failed|failing|exception|✗|✕|FAIL)\b/i,
  /(\d+) (failing|failed)/i,
  /test suite failed/i,
  /exit code [1-9]/i,
  /cannot find module/i,
  /syntaxerror/i,
  /typeerror/i,
];

const SUCCESS_PATTERNS = [
  /(\d+) (passing|passed)/i,
  /all tests passed/i,
  /✓|✔|pass/i,
  /Tests:\s+\d+ passed/i,
];

function analyzeOutput(output: string): {
  passed: boolean;
  failureExcerpt: string;
} {
  const hasFailure = FAILURE_PATTERNS.some((p) => p.test(output));
  const hasSuccess = SUCCESS_PATTERNS.some((p) => p.test(output));

  // Extract first ~2000 chars of error context for the feedback prompt
  const failureExcerpt = hasFailure
    ? output.slice(0, 2000)
    : "";

  if (hasFailure) return { passed: false, failureExcerpt };
  if (hasSuccess) return { passed: true, failureExcerpt: "" };

  // If no clear signal, treat non-empty output with no success markers as suspicious
  return {
    passed: output.trim().length === 0,
    failureExcerpt: output.slice(0, 2000),
  };
}

// ─── TesterAgent ──────────────────────────────────────────────────────────────

export class TesterAgent {
  constructor(
    private mcp: MCPClient,
    private testCommand: string = "npm run test",
    private testCwd: string = "."
  ) {}

  /**
   * Run the test suite and return a structured result.
   */
  async runTests(): Promise<TestResult> {
    console.log(`[TesterAgent] Running: ${this.testCommand} in ${this.testCwd}`);

    const result = await this.mcp.runCommand(this.testCommand, {
      cwd: this.testCwd,
      timeout_ms: 120_000,
    });

    const rawOutput = result.output;
    const { passed, failureExcerpt } = analyzeOutput(rawOutput);

    if (passed) {
      console.log("[TesterAgent] ✅ Tests passed.");
      return {
        passed: true,
        summary: "All tests passed successfully.",
        feedback: "",
        rawOutput,
      };
    }

    console.log("[TesterAgent] ❌ Tests failed.");

    const feedback = this.buildFeedbackPrompt(failureExcerpt);

    return {
      passed: false,
      summary: "Tests failed. See feedback for details.",
      feedback,
      rawOutput,
    };
  }

  private buildFeedbackPrompt(failureExcerpt: string): string {
    return (
      `The following test failures were detected. Please fix the code:\n\n` +
      `\`\`\`\n${failureExcerpt}\n\`\`\`\n\n` +
      `Instructions:\n` +
      `- Identify the root cause of each failure.\n` +
      `- Return only the fixed files in the required JSON format.\n` +
      `- Do not change unrelated code.`
    );
  }
}
