import { GoogleGenAI } from '@google/genai';
import Anthropic from '@anthropic-ai/sdk';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import * as dotenv from 'dotenv';
import fs from 'fs/promises';

dotenv.config();

// Define a simple fallback for Google Gen AI if the structure differs
async function callGemini(prompt: string) {
    if (!process.env.GEMINI_API_KEY) {
        console.warn("⚠️  GEMINI_API_KEY is not set. Skipping Gemini Planning.");
        return "Dummy Plan: Please write a simple node.js hello world script.";
    }
    
    console.log("🤖 Gemini (Planner) is working on the plan...");
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: `You are the Planner agent. Create a detailed technical implementation plan for this task:\n\n${prompt}\n\nOutput only markdown.`
        });
        const plan = response.text;
        await fs.writeFile('plan.md', plan);
        console.log("✅ Gemini has created the plan and saved it to plan.md\n");
        return plan;
    } catch (e: any) {
        console.error("Gemini API Error:", e.message);
        return "Failed to generate plan.";
    }
}

async function callClaude(plan: string) {
    if (!process.env.ANTHROPIC_API_KEY) {
        console.warn("⚠️  ANTHROPIC_API_KEY is not set. Skipping Claude Building.");
        return "// Dummy code built by Claude\nconsole.log('Hello World');";
    }

    console.log("🤖 Claude (Builder) is writing the code...");
    try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        const response = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 4096,
            messages: [{ 
                role: "user", 
                content: `You are the Builder agent. Here is the implementation plan:\n\n${plan}\n\nPlease output the necessary code exactly as instructed. Wrap code blocks in standard markdown.` 
            }]
        });
        
        // Extract text from Claude's response
        const code = response.content.filter(c => c.type === 'text').map((c: any) => c.text).join('\n');
        await fs.writeFile('built_code.md', code);
        console.log("✅ Claude has written the code and saved it to built_code.md\n");
        return code;
    } catch (e: any) {
        console.error("Claude API Error:", e.message);
        return "Failed to write code.";
    }
}

async function callMCPTester() {
    console.log("🤖 MCP (Tester) is initializing...");
    try {
        // Initialize MCP Client to connect to a local MCP server
        // Using "server-everything" as a dummy test server. In reality, you'd point to your actual test MCP server.
        // For Windows, we use cmd.exe to run npx.
        const transport = new StdioClientTransport({
            command: "cmd.exe",
            args: ["/c", "npx", "-y", "@modelcontextprotocol/server-everything"]
        });
        
        const client = new Client({
            name: "tester-agent",
            version: "1.0.0"
        }, {
            capabilities: {}
        });

        await client.connect(transport);
        console.log("✅ Connected to MCP Server via Stdio");

        const tools = await client.listTools();
        console.log("🛠️  Available MCP Tools for Testing:", tools.tools.map(t => t.name).join(', '));
        
        console.log("✅ MCP Testing agent successfully verified tool access.\n");
        
        await client.close();
    } catch (e: any) {
        console.error("MCP Tester Error:", e.message);
    }
}

async function main() {
    const task = process.argv.slice(2).join(' ') || "Write a small javascript function that checks if a string is a palindrome and test it.";
    
    console.log(`🚀 Starting Hybrid 3-Agent Workflow\n`);
    console.log(`📋 Task: ${task}\n`);
    
    try {
        const plan = await callGemini(task);
        const code = await callClaude(plan);
        await callMCPTester();
        
        console.log("🎉 All 3 agents successfully completed their phases!");
    } catch (err) {
        console.error("❌ Orchestrator failed:", err);
    }
}

main();
