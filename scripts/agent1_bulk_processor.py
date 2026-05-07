import os
import json
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv
import PIL.Image

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def process_chapters(image_dir, chapter_range, subject):
    print(f"Processing {subject} Chapters {chapter_range}...")
    
    batch_size = 1
    output_file = f"scratch/Legal_Chapters_{chapter_range[0]}-{chapter_range[-1]}.md"
    
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(f"# {subject} Vault Extraction\n\n")

    for i in range(chapter_range[0], chapter_range[-1] + 1, batch_size):
        batch_range = range(i, min(i + batch_size, chapter_range[-1] + 1))
        print(f"  Page: {list(batch_range)}")
        
        images = []
        for p in batch_range:
            path = os.path.join(image_dir, f"page_{p}.png")
            if os.path.exists(path):
                images.append(PIL.Image.open(path))
        
        if not images:
            continue

        prompt = f"""
        Act as a Strict Data Architect for LexCLAT.
        Task: Extract study material from the provided images and organize into Chapters.
        
        Subject: {subject}
        
        Output Format for each chapter discovered in these images:
        ---
        # Chapter [Number]: [Title]
        ## Concept Primer
        [Detailed transcription of the legal concepts, facts, and principles]
        
        ## Landmark Cases / Facts
        [Any cases or specific legal facts mentioned]
        
        ## Trap Analysis
        [Identify potential traps or common mistakes based on the text]
        ---
        """

        try:
            response = client.models.generate_content(
                model='gemini-flash-lite-latest',
                contents=images + [prompt]
            )
            
            with open(output_file, "a", encoding="utf-8") as f:
                f.write(response.text + "\n")
            print(f"  Success.")
            
            # Wait to avoid rate limits
            time.sleep(75)
            
        except Exception as e:
            print(f"  Error: {e}")
            if "429" in str(e):
                time.sleep(120)

if __name__ == "__main__":
    process_chapters("scratch/images", range(950, 960), "Legal Reasoning")
