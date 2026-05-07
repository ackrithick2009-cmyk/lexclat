import os
import sys
import time
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def extract_raw(pdf_path, start_page, end_page, chapter_num):
    print(f"Agent 1 (Extractor): Processing Chapter {chapter_num} (Pages {start_page}-{end_page})...")
    
    try:
        # Upload file
        print(f"Uploading {pdf_path}...")
        f = client.files.upload(file=pdf_path)
        while True:
            f_info = client.files.get(name=f.name)
            if f_info.state.name == "ACTIVE":
                break
            time.sleep(5)
            
        prompt = f"""
        Role: Content Extractor.
        Task: Extract all raw text, headings, and key legal definitions from Chapter {chapter_num} of the uploaded PDF.
        Constraint: Do not format or create JSON. Simply output the cleaned text.
        Instructions: Focus only on pages {start_page} to {end_page}. Ignore images and footer citations.
        """
        
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=[f, prompt]
        )
        
        raw_text = response.text
        filename = f"scratch/Raw_Extract_Ch{chapter_num}.md"
        os.makedirs("scratch", exist_ok=True)
        
        with open(filename, "w", encoding="utf-8") as out:
            out.write(raw_text)
            
        print(f"Agent 1: Raw extract saved to {filename}. Stopping and notifying Agent 2.")
        return filename
        
    except Exception as e:
        print(f"Agent 1 Error: {e}")
        return None

if __name__ == "__main__":
    if len(sys.argv) < 5:
        print("Usage: python extractor.py [pdf_path] [start] [end] [ch_num]")
    else:
        extract_raw(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]))
