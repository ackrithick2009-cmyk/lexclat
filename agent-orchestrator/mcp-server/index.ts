#!/usr/bin/env node
/**
 * MCP Server — Testing Agent Backend
 *
 * Exposes tools that allow an AI agent to:
 *   - run_command  : execute shell commands (e.g. npm run test)
 *   - read_file    : read file contents from the workspace
 *   - write_file   : write generated code to the workspace
 *   - list_dir     : list files in a directory
 *
 * Transport: stdio (default) — the orchestrator spawns this process and
 * communicates via stdin/stdout using the MCP protocol.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";

const execAsync = promisify(exec);

// ─── Configuration ────────────────────────────────────────────────────────────

const WORKSPACE_PATH = process.env.WORKSPACE_PATH
  ? path.resolve(process.env.WORKSPACE_PATH)
  : path.resolve("..");

const MAX_OUTPUT_CHARS = 20_000; // prevent giant blobs flooding the agent context

// ─── Server Setup ─────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "agent-tester-mcp",
  version: "1.0.0",
});

// ─── Tool: run_command ────────────────────────────────────────────────────────

server.tool(
  "run_command",
  "Execute a shell command in the workspace directory and return stdout/stderr. " +
    "Use this to run tests, lint, build, etc.",
  {
    command: z.string().describe("The shell command to execute (e.g. 'npm run test')"),
    cwd: z
      .string()
      .optional()
      .describe(
        "Working directory relative to the workspace root. Defaults to workspace root."
      ),
    timeout_ms: z
      .number()
      .optional()
      .default(60_000)
      .describe("Timeout in milliseconds. Default 60s."),
  },
  async ({ command, cwd, timeout_ms }) => {
    const workDir = cwd ? path.join(WORKSPACE_PATH, cwd) : WORKSPACE_PATH;

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: workDir,
        timeout: timeout_ms,
        shell: "cmd.exe",
      });

      const output = [
        stdout ? `--- STDOUT ---\n${stdout}` : "",
        stderr ? `--- STDERR ---\n${stderr}` : "",
      ]
        .filter(Boolean)
        .join("\n")
        .slice(0, MAX_OUTPUT_CHARS);

      return {
        content: [
          {
            type: "text",
            text: output || "(command produced no output)",
          },
        ],
      };
    } catch (err: any) {
      const msg = [
        `Command failed: ${command}`,
        err.stdout ? `STDOUT:\n${err.stdout}` : "",
        err.stderr ? `STDERR:\n${err.stderr}` : "",
        err.message ? `ERROR: ${err.message}` : "",
      ]
        .filter(Boolean)
        .join("\n")
        .slice(0, MAX_OUTPUT_CHARS);

      return {
        content: [{ type: "text", text: msg }],
        isError: true,
      };
    }
  }
);

// ─── Tool: read_file ──────────────────────────────────────────────────────────

server.tool(
  "read_file",
  "Read the contents of a file in the workspace.",
  {
    file_path: z
      .string()
      .describe("Path to the file, relative to the workspace root."),
  },
  async ({ file_path }) => {
    const fullPath = path.join(WORKSPACE_PATH, file_path);
    try {
      const content = await fs.readFile(fullPath, "utf-8");
      return {
        content: [
          {
            type: "text",
            text: content.slice(0, MAX_OUTPUT_CHARS),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Error reading file: ${err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── Tool: write_file ─────────────────────────────────────────────────────────

server.tool(
  "write_file",
  "Write content to a file in the workspace. Creates parent directories if needed.",
  {
    file_path: z
      .string()
      .describe("Path to the file, relative to the workspace root."),
    content: z.string().describe("The full content to write to the file."),
  },
  async ({ file_path, content }) => {
    const fullPath = path.join(WORKSPACE_PATH, file_path);
    try {
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, content, "utf-8");
      return {
        content: [{ type: "text", text: `Successfully wrote ${fullPath}` }],
      };
    } catch (err: any) {
      return {
        content: [{ type: "text", text: `Error writing file: ${err.message}` }],
        isError: true,
      };
    }
  }
);

// ─── Tool: list_dir ───────────────────────────────────────────────────────────

server.tool(
  "list_dir",
  "List files and subdirectories in a workspace directory.",
  {
    dir_path: z
      .string()
      .optional()
      .default(".")
      .describe(
        "Directory path relative to the workspace root. Defaults to workspace root."
      ),
  },
  async ({ dir_path }) => {
    const fullPath = path.join(WORKSPACE_PATH, dir_path);
    try {
      const entries = await fs.readdir(fullPath, { withFileTypes: true });
      const listing = entries
        .map((e) => `${e.isDirectory() ? "[DIR] " : "[FILE]"} ${e.name}`)
        .join("\n");
      return {
        content: [{ type: "text", text: listing || "(empty directory)" }],
      };
    } catch (err: any) {
      return {
        content: [
          { type: "text", text: `Error listing directory: ${err.message}` },
        ],
        isError: true,
      };
    }
  }
);

// ─── Start Server ─────────────────────────────────────────────────────────────

const transport = new StdioServerTransport();
await server.connect(transport);

console.error(
  `[MCP Server] agent-tester-mcp running | workspace: ${WORKSPACE_PATH}`
);
