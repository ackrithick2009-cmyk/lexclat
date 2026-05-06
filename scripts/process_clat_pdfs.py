import os
import sys
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
    # Use the files we already uploaded to save time
    file1 = client.files.get(name="files/ohag82m2byty")
    file2 = client.files.get(name="files/o7o7lp6avj2b")
    
    uploaded_files = [file1, file2]
    
    prompt = """
    I have uploaded my raw CLAT study material.
    
    Act as a strict Data Architect. Your task is to analyze the raw material, match the content to the correct Subject (Legal Reasoning, Logical Reasoning, English, Quantitative Techniques, Current Affairs), and extract it.
    
    Strict Constraints:
    - Zero Generation: Do not generate any new legal concepts, passages, or outside knowledge. Use ONLY the text provided in the raw files.
    - Matching: Read the headings, passages, and concepts in the raw text and map them to the CLAT syllabus subjects.
    
    Since the files are very large, for this first pass, please provide a comprehensive Mapping Table. 
    For each subject found in these documents, list the Chapters/Topics discovered and the approximate location or content summary.
    Do NOT output the full content yet. Output ONLY the JSON mapping table in this format:
    {
      "mapping": [
        {
          "subject": "Legal Reasoning",
          "topics": ["Torts", "Contracts"],
          "summary": "Found 10 passages on torts and 5 on contracts."
        }
      ]
    }
    """
    
    print("\nSending prompt to Gemini 2.5 Pro to generate mapping table...")
    try:
        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=uploaded_files + [prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        print("\n=== Gemini Output ===")
        print(response.text)
        
        with open(r"scratch\mapping_table.json", "w", encoding="utf-8") as f:
            f.write(response.text)
        print("\nSaved output to scratch/mapping_table.json")
        
    except Exception as e:
        print(f"Error generating content: {e}")

if __name__ == "__main__":
    main()
