import os
import sys
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def process_bulk_vault(filename, subject="Legal"):
    print(f"Agent 2 (Architect): Monitoring for {filename}...")
    
    if not os.path.exists(filename):
        print(f"Agent 2: File {filename} not found. Skipping.")
        return

    with open(filename, "r", encoding="utf-8") as f:
        raw_text = f.read()

    print(f"Agent 2: Processing raw text for {filename}...")
    
    prompt = f"""
    Role: Technical Writer & Quiz Developer.
    Task: Convert the provided raw text into a polished {subject}_Vault_Chapter.md and a 10-question practice quiz JSON.
    
    Action:
    1. Convert the raw text into a polished Markdown using a standard template (Concept Primer, Passage, Trap Analysis).
    2. Generate a 10-question practice quiz based only on this text.
    
    Output format:
    ---MARKDOWN---
    [Markdown Content]
    ---JSON---
    {{ "quizzes": [...] }}
    
    Constraint: Only use the raw extract provided. Do not use outside knowledge.
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-flash-lite-latest',
            contents=[prompt, raw_text]
        )
        
        output = response.text
        
        # Parse output
        parts = output.split("---JSON---")
        md_content = parts[0].replace("---MARKDOWN---", "").strip()
        json_content = parts[1].strip() if len(parts) > 1 else "{}"
        
        # Save final files
        os.makedirs(f"wiki/{subject.lower()}_vault", exist_ok=True)
        os.makedirs("wiki/quizzes", exist_ok=True)
        
        base_name = os.path.basename(filename).replace(".md", "")
        md_path = f"wiki/{subject.lower()}_vault/{base_name}_Polished.md"
        json_path = f"wiki/quizzes/{base_name}_Quiz.json"
        
        with open(md_path, "w", encoding="utf-8") as out:
            out.write(md_content)
        with open(json_path, "w", encoding="utf-8") as out:
            out.write(json_content)
            
        print(f"Agent 2: Final files saved to {md_path} and {json_path}")
        
    except Exception as e:
        print(f"Agent 2 Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python architect.py [filename] [subject]")
    else:
        subject = sys.argv[2] if len(sys.argv) > 2 else "Legal"
        process_bulk_vault(sys.argv[1], subject)
