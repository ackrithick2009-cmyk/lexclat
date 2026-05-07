import os
import sys
import time
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("Error: GEMINI_API_KEY not found in .env")
    sys.exit(1)

client = genai.Client(api_key=api_key)

def extract_content(pdf_path, start_page, end_page, subject, chapter_num, chapter_title):
    print(f"Extracting {subject} Chapter {chapter_num}: {chapter_title} (Pages {start_page}-{end_page})...")
    
    try:
        # Upload file
        print(f"Uploading {pdf_path}...")
        f = client.files.upload(file=pdf_path)
        print(f"File uploaded: {f.name}")
        
        while True:
            f_info = client.files.get(name=f.name)
            print(f"Current state: {f_info.state.name}")
            if f_info.state.name == "ACTIVE":
                break
            time.sleep(5)
            
        prompt = f"""
        Act as a strict Data Architect. Extract the content for {subject} Chapter {chapter_num}: {chapter_title} from pages {start_page} to {end_page} of the provided PDF.
        
        Strict Constraints:
        - Zero Generation: Use ONLY text from the PDF.
        - Formatting: Create a highly readable Markdown file with concept primers and reading passages.
        - MCQs: If there are Multiple Choice Questions, extract them into a separate JSON block at the end.
        
        Output format:
        ---MARKDOWN---
        # {subject} Chapter {chapter_num}: {chapter_title}
        [Extracted Content]
        
        ---JSON---
        {{ "quizzes": [...] }}
        """
        
        print("Generating content...")
        # Use gemini-flash-lite-latest which usually has higher free quotas
        response = client.models.generate_content(
            model='models/gemini-flash-lite-latest',
            contents=[f, prompt]
        )
        
        output = response.text
        print("\n=== Success! ===")
        
        # Split markdown and json
        if "---JSON---" in output:
            parts = output.split("---JSON---")
            md_content = parts[0].replace("---MARKDOWN---", "").strip()
            json_content = parts[1].strip()
        else:
            md_content = output
            json_content = "{}"
        
        # Save files
        md_path = f"wiki/legal_vault/{subject}_Chapter_{chapter_num}.md"
        json_path = f"wiki/quizzes/{subject}_Chapter_{chapter_num}_Quiz.json"
        
        os.makedirs("wiki/legal_vault", exist_ok=True)
        os.makedirs("wiki/quizzes", exist_ok=True)
        
        with open(md_path, "w", encoding="utf-8") as out:
            out.write(md_content)
        with open(json_path, "w", encoding="utf-8") as out:
            out.write(json_content)
            
        print(f"Saved to {md_path} and {json_path}")
        
    except Exception as e:
        print(f"Error during extraction: {e}")

if __name__ == "__main__":
    extract_content(
        r"C:\Users\acdur\Downloads\New folder\Merged PDF 20260506 18.53.21_compress - converted (1).pdf",
        89, 91, "Legal", 10, "Legal Facts"
    )
