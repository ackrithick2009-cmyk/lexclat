/**
 * MCP Client — wraps the MCP SDK to provide a typed interface for calling
 * the tools exposed by the Testing Agent MCP server.
 *
 * Spawns the MCP server as a child process and communicates over stdio.
 */

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommandResult {
  output: string;
  isError: boolean;
}

export interface FileContent {
  content: string;
  isError: boolean;
}

// ─── MCPClient ────────────────────────────────────────────────────────────────

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport | null = null;
  private connected = false;

  constructor() {
    this.client = new Client({ name: "agent-orchestrator-client", version: "1.0.0" });
  }

  /**
   * Connect to the MCP server by spawning the server process.
   */
  async connect(workspacePath?: string): Promise<void> {
    const serverScript = path.join(__dirname, "..", "mcp-server", "index.ts");

    this.transport = new StdioClientTransport({
      command: "tsx",
      args: [serverScript],
      env: {
        ...process.env,
        WORKSPACE_PATH: workspacePath ?? path.join(__dirname, "..", ".."),
      },
    });

    await this.client.connect(this.transport);
    this.connected = true;
    console.log("[MCPClient] Connected to MCP server.");
  }

  /** Disconnect and clean up. */
  async disconnect(): Promise<void> {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log("[MCPClient] Disconnected from MCP server.");
    }
  }

  // ─── Tool Wrappers ────────────────────────────────────────────────────────

  /**
   * Execute a shell command in the workspace.
   */
  async runCommand(
    command: string,
    options: { cwd?: string; timeout_ms?: number } = {}
  ): Promise<CommandResult> {
    const result = await this.client.callTool({
      name: "run_command",
      arguments: {
        command,
        cwd: options.cwd,
        timeout_ms: options.timeout_ms ?? 60_000,
      },
    });

    const text = this.extractText(result.content);
    return { output: text, isError: !!result.isError };
  }

  /**
   * Read a file from the workspace.
   */
  async readFile(filePath: string): Promise<FileContent> {
    const result = await this.client.callTool({
      name: "read_file",
      arguments: { file_path: filePath },
    });
    const text = this.extractText(result.content);
    return { content: text, isError: !!result.isError };
  }

  /**
   * Write content to a file in the workspace.
   */
  async writeFile(filePath: string, content: string): Promise<CommandResult> {
    const result = await this.client.callTool({
      name: "write_file",
      arguments: { file_path: filePath, content },
    });
    const text = this.extractText(result.content);
    return { output: text, isError: !!result.isError };
  }

  /**
   * List files in a workspace directory.
   */
  async listDir(dirPath: string = "."): Promise<CommandResult> {
    const result = await this.client.callTool({
      name: "list_dir",
      arguments: { dir_path: dirPath },
    });
    const text = this.extractText(result.content);
    return { output: text, isError: !!result.isError };
  }

  // ─── Helpers ──────────────────────────────────────────────────────────────

  private extractText(content: unknown): string {
    if (!Array.isArray(content)) return String(content);
    return content
      .filter((c: any) => c.type === "text")
      .map((c: any) => c.text as string)
      .join("\n");
  }
}
