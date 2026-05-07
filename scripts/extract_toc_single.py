import os
import PIL.Image
import sys
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def extract_page_text(p_idx):
    img_path = f"scratch/images/page_{p_idx}.png"
    if not os.path.exists(img_path):
        print(f"File {img_path} not found.")
        return
        
    img = PIL.Image.open(img_path)
    prompt = "Transcribe this page. Identify the subject and key topics. If it contains a Table of Contents, list it."
    
    try:
        response = client.models.generate_content(
            model='gemini-flash-lite-latest',
            contents=[img, prompt]
        )
        print(f"\n=== Page {p_idx} Transcription ===")
        sys.stdout.buffer.write(response.text.encode('utf-8'))
        sys.stdout.write("\n")
        
        with open(f"scratch/transcription_page_{p_idx}.txt", "w", encoding="utf-8") as f:
            f.write(response.text)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        p_idx = int(sys.argv[1])
        extract_page_text(p_idx)
    else:
        extract_page_text(1)
