import os
from google import genai
from dotenv import load_dotenv
import PIL.Image
import time

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def find_chapters():
    print("Scanning PDF for Chapter Headers...")
    for page in range(1, 991, 30):
        print(f"  Checking PDF Page {page}...")
        
        # Ensure image exists
        img_path = f"scratch/images/page_{page}.png"
        if not os.path.exists(img_path):
            # Try converting on the fly
            import fitz
            doc = fitz.open(r"C:\Users\acdur\Downloads\Merged PDF 20260506 18.53.21_compress - converted (1) (1).pdf")
            p = doc.load_page(page-1)
            pix = p.get_pixmap(matrix=fitz.Matrix(2, 2))
            os.makedirs("scratch/images", exist_ok=True)
            pix.save(img_path)
            
        img = PIL.Image.open(img_path)
        prompt = "What is the subject and chapter title on this page? Answer in 5 words."
        
        try:
            response = client.models.generate_content(
                model='gemini-flash-lite-latest',
                contents=[img, prompt]
            )
            print(f"    Page {page}: {response.text.strip()}")
            time.sleep(10)
        except Exception as e:
            print(f"    Page {page}: Error {e}")

if __name__ == "__main__":
    find_chapters()
