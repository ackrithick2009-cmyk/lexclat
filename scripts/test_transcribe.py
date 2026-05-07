import os
import PIL.Image
from dotenv import load_dotenv
from google import genai
import sys

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def test_single():
    img_path = "scratch/images/page_1.png"
    img = PIL.Image.open(img_path)
    prompt = "Transcribe the text from this image exactly."
    
    try:
        response = client.models.generate_content(
            model='gemini-1.5-flash',
            contents=[img, prompt]
        )
        print("Success:")
        sys.stdout.buffer.write(response.text.encode('utf-8'))
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_single()
