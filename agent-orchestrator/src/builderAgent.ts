/**
 * Builder Agent — uses Claude (claude-3-5-sonnet) to:
 *   1. Receive an implementation plan (Markdown)
 *   2. Generate code files as a structured response
 *   3. Accept feedback from the Tester and iterate
 *
 * Claude is instructed to respond ONLY with a JSON array of file objects
 * so that the orchestrator can parse and write them deterministically.
 */

import Anthropic from "@anthropic-ai/sdk";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GeneratedFile {
  path: string;    // relative to workspace root
  content: string; // full file content
}

export interface BuilderResult {
  files: GeneratedFile[];
  summary: string;
  rawResponse: string;
}

// ─── System Prompt ────────────────────────────────────────────────────────────

const BUILDER_SYSTEM_PROMPT = `You are an expert software engineer acting as the Builder Agent in a 3-agent system.

Your responsibilities:
1. Receive an implementation plan (Markdown) and/or feedback from a Tester Agent.
2. Generate the required source code files.
3. Respond ONLY with valid JSON in the following format — no prose, no markdown fences:

{
  "summary": "Brief description of what you built or changed",
  "files": [
    {
      "path": "relative/path/from/workspace/root.ts",
      "content": "full file content here"
    }
  ]
}

Rules:
- Produce complete, working, production-quality code.
- Include all necessary imports.
- Do not truncate or use placeholder comments like "// ... rest of code".
- If fixing a bug from tester feedback, only output the files that changed.
- Always output valid JSON. Your entire response must be parseable by JSON.parse().`;

// ─── BuilderAgent ─────────────────────────────────────────────────────────────

export class BuilderAgent {
  private client: Anthropic;
  private model: string;
  private conversationHistory: Anthropic.MessageParam[] = [];

  constructor(
    apiKey: string,
    model: string = "claude-opus-4-5"
  ) {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  /**
   * Start a new build from an implementation plan.
   */
  async buildFromPlan(implementationPlan: string): Promise<BuilderResult> {
    this.conversationHistory = []; // fresh conversation

    const userMessage = `Please implement the following plan:\n\n${implementationPlan}`;
    return this.callClaude(userMessage);
  }

  /**
   * Feed tester failure feedback back to Claude for a fix.
   */
  async fixFromFeedback(
    feedback: string,
    previousFiles: GeneratedFile[]
  ): Promise<BuilderResult> {
    const filesSummary = previousFiles
      .map((f) => `### ${f.path}\n\`\`\`\n${f.content.slice(0, 500)}...\n\`\`\``)
      .join("\n\n");

    const userMessage =
      `The Tester Agent found the following failures:\n\n${feedback}\n\n` +
      `Previously generated files for context:\n\n${filesSummary}\n\n` +
      `Please fix the issues and return only the changed files in the required JSON format.`;

    return this.callClaude(userMessage);
  }

  // ─── Private ──────────────────────────────────────────────────────────────

  private async callClaude(userMessage: string): Promise<BuilderResult> {
    this.conversationHistory.push({ role: "user", content: userMessage });

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 8192,
      system: BUILDER_SYSTEM_PROMPT,
      messages: this.conversationHistory,
    });

    const rawResponse =
      response.content
        .filter((b) => b.type === "text")
        .map((b) => (b as Anthropic.TextBlock).text)
        .join("") ?? "";

    // Add assistant turn to history for multi-turn conversations
    this.conversationHistory.push({ role: "assistant", content: rawResponse });

    // Parse the JSON response
    const parsed = this.parseBuilderResponse(rawResponse);
    return { ...parsed, rawResponse };
  }

  private parseBuilderResponse(raw: string): Omit<BuilderResult, "rawResponse"> {
    try {
      // Strip any accidental markdown fences
      const cleaned = raw
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      if (!Array.isArray(parsed.files)) {
        throw new Error("Response JSON missing 'files' array");
      }

      return {
        summary: parsed.summary ?? "No summary provided.",
        files: parsed.files as GeneratedFile[],
      };
    } catch (err) {
      console.error("[BuilderAgent] Failed to parse response:", err);
      console.error("[BuilderAgent] Raw response:", raw.slice(0, 500));
      return { summary: "Parse error — see raw response.", files: [] };
    }
  }
}
