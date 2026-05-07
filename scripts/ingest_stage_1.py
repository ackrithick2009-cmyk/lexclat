import os
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv
import PIL.Image

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

STAGE_1_MAPPING = [
    {"subject": "Legal", "pdf_page": 800, "chapter": 10},
    {"subject": "Quant", "pdf_page": 1, "chapter": 89},
    {"subject": "English", "pdf_page": 577, "chapter": 60},
    {"subject": "GK", "pdf_page": 401, "chapter": 42}
]

def ingest_stage_1():
    print("Starting Stage 1 Ingestion...")
    
    for item in STAGE_1_MAPPING:
        subject = item["subject"]
        page = item["pdf_page"]
        chapter = item["chapter"]
        
        print(f"  Processing {subject} (PDF Page {page})...")
        
        img_path = f"scratch/images/page_{page}.png"
        if not os.path.exists(img_path):
            print(f"  Image {img_path} not found. Skipping.")
            continue
            
        img = PIL.Image.open(img_path)
        prompt = f"""
        Act as a Strict Data Architect for LexCLAT.
        Task: Extract study material for {subject} Chapter {chapter} from this image.
        
        Output: Markdown with Concept Primer, Landmark Facts/Cases, and Trap Analysis.
        """
        
        try:
            response = client.models.generate_content(
                model='gemini-flash-lite-latest',
                contents=[img, prompt]
            )
            
            raw_text = response.text
            os.makedirs("scratch/stage1", exist_ok=True)
            output_file = f"scratch/stage1/{subject}_Ch{chapter}.md"
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(raw_text)
            
            print(f"  Success: {output_file}")
            time.sleep(30) # Delay between subjects
            
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == "__main__":
    ingest_stage_1()
