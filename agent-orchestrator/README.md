# Agent Orchestrator

A **Hybrid 3-Agent System** for automated software development:

```
Planner (Gemini) ──► Builder (Claude) ──► Tester (MCP)
                           ▲________________________|
                              (feedback loop on failure)
```

## Architecture

| Agent | Model | Role |
|-------|-------|------|
| **Planner** | Gemini | Generates `implementation_plan.md` and `task.md` |
| **Builder** | Claude (Anthropic) | Reads plan → writes code as structured JSON |
| **Tester** | MCP Server | Runs `npm run test`, analyzes output, sends failures back |

## Directory Structure

```
agent-orchestrator/
├── mcp-server/
│   └── index.ts          # MCP server (tools: run_command, read_file, write_file, list_dir)
├── src/
│   ├── orchestrator.ts   # Main entry point — the glue
│   ├── builderAgent.ts   # Claude integration
│   ├── testerAgent.ts    # Test runner + failure analysis
│   ├── mcpClient.ts      # MCP SDK client wrapper
│   └── fileWriter.ts     # Writes generated files via MCP
├── .env.example          # Environment variable template
├── package.json
└── tsconfig.json
```

## Setup

### 1. Install Dependencies

```bash
cd agent-orchestrator
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env and add your API keys:
# ANTHROPIC_API_KEY=sk-ant-...
# GEMINI_API_KEY=AIza...  (optional, used by Planner)
```

### 3. Run Demo (no API key for Planner needed)

The `--demo` flag uses a built-in calculator task to demonstrate the full loop:

```bash
npm run demo
# or:
tsx src/orchestrator.ts --demo
```

This will:
1. Send a plan to Claude to build a `Calculator` class + tests
2. Write the generated files to `demo-output/`
3. Run the tests via MCP
4. Auto-fix failures if any

### 4. Run with a Custom Plan

```bash
tsx src/orchestrator.ts --plan path/to/implementation_plan.md --max-retries 3
```

## MCP Server (standalone)

The MCP server can also be run standalone for use with other MCP-compatible clients:

```bash
npm run mcp-server
```

Exposed tools:
- `run_command` — execute shell commands
- `read_file` — read workspace files
- `write_file` — write files to workspace
- `list_dir` — list directory contents
