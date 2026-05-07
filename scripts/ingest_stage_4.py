import os
import time
from google import genai
from dotenv import load_dotenv
import PIL.Image

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

STAGE_4_MAPPING = [
    {"subject": "Legal", "pdf_page": 901, "chapter": 13}, # Legal Practice
    {"subject": "GK", "pdf_page": 631, "chapter": 45},    # Medieval History
    {"subject": "GK", "pdf_page": 721, "chapter": 61},    # Sports
    {"subject": "Quant", "pdf_page": 40, "chapter": 91}   # Math MCQs (Retry from Stage 3)
]

def ingest_stage_4():
    print("Starting Stage 4 (Final) Ingestion...")
    
    for item in STAGE_4_MAPPING:
        subject = item["subject"]
        page = item["pdf_page"]
        chapter = item["chapter"]
        
        print(f"  Processing {subject} (PDF Page {page})...")
        
        img_path = f"scratch/images/page_{page}.png"
        if not os.path.exists(img_path):
            import fitz
            doc = fitz.open(r"C:\Users\acdur\Downloads\Merged PDF 20260506 18.53.21_compress - converted (1) (1).pdf")
            p = doc.load_page(page-1)
            pix = p.get_pixmap(matrix=fitz.Matrix(2, 2))
            os.makedirs("scratch/images", exist_ok=True)
            pix.save(img_path)
            
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
            os.makedirs("scratch/stage4", exist_ok=True)
            output_file = f"scratch/stage4/{subject}_Ch{chapter}.md"
            with open(output_file, "w", encoding="utf-8") as f:
                f.write(raw_text)
            
            print(f"  Success: {output_file}")
            time.sleep(30)
            
        except Exception as e:
            print(f"  Error: {e}")

if __name__ == "__main__":
    ingest_stage_4()
