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

def main():
    # Using the second PDF specifically as requested in the latest message
    # Re-uploading to be sure or using existing if name is known.
    # Let's re-upload since I don't want to guess the name if it expired.
    path = r"C:\Users\acdur\Downloads\New folder\Merged PDF 20260506 19.08.18 - converted (2).pdf"
    
    print(f"Uploading {path}...")
    f = client.files.upload(file=path)
    print(f"Uploaded as: {f.name}. Waiting for processing...")
    
    while True:
        f_info = client.files.get(name=f.name)
        if f_info.state.name == "ACTIVE":
            break
        time.sleep(5)
    
    prompt = """
    I have uploaded a scanned PDF of a CLAT study guide (468 pages).
    
    Your task is to generate a comprehensive MAPPING TABLE that organizes the content of this entire document into the following 5 subjects:
    1. Legal Reasoning
    2. Current Affairs & GK
    3. English Language
    4. Logical Reasoning
    5. Quantitative Techniques
    
    For each subject, identify the chapters, topics, and approximate page ranges found in the document.
    Output ONLY a JSON object in this format:
    {
      "mapping": [
        {
          "subject": "Subject Name",
          "chapters": [
            { "title": "Chapter Title", "pages": "start-end", "summary": "Briefly what is covered" }
          ]
        }
      ]
    }
    """
    
    print("\nRequesting mapping table from Gemini 2.0 Flash...")
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=[f, prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        print("\n=== Mapping Table Extracted ===")
        print(response.text)
        
        with open(r"scratch\mapping_table_v2.json", "w", encoding="utf-8") as out:
            out.write(response.text)
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
