import os
import sys
import time
import json
from dotenv import load_dotenv
from google import genai
from google.genai import types

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

import PIL.Image

def bulk_ingest_with_images(image_dir, syllabus_path):
    print(f"Starting Vision-Based Mapping for {image_dir}...")
    
    # 1. Load Syllabus
    with open(syllabus_path, "r", encoding="utf-8") as f:
        syllabus = json.load(f)
    
    # 2. Prepare Images
    images = []
    for img_name in sorted(os.listdir(image_dir)):
        if img_name.endswith(".png"):
            img_path = os.path.join(image_dir, img_name)
            images.append(PIL.Image.open(img_path))
    
    print(f"Loaded {len(images)} images for analysis.")

    # 3. Request Mapping Table
    prompt = f"""
    Role: Strict Data Architect.
    Task: Analyze the provided images of a CLAT study guide and match them to the syllabus blueprint.
    
    Syllabus Blueprint:
    {json.dumps(syllabus, indent=2)}
    
    Instructions:
    1. Scan the provided images (which are the first pages of the guide).
    2. Identify the Table of Contents and major subject boundaries.
    3. Create a mapping of PDF page ranges (inferred from TOC) to syllabus Sub_Topics.
    
    Output format: JSON only.
    {{
      "mappings": [
        {{
          "subject": "Legal Reasoning",
          "chapter": "Law of Torts",
          "pages": "120-145",
          "sub_topics": ["Negligence", "Defamation"],
          "summary": "Basics of negligence and landmark defamation cases."
        }}
      ]
    }}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=images + [prompt],
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
            )
        )
        
        mapping_data = response.text
        os.makedirs("scratch", exist_ok=True)
        with open("scratch/bulk_mapping_results.json", "w", encoding="utf-8") as out:
            out.write(mapping_data)
        
        print("\n=== Mapping Table Generated ===")
        print(mapping_data)
        return mapping_data
        
    except Exception as e:
        print(f"Error in mapping: {e}")
        return None

if __name__ == "__main__":
    image_dir = "scratch/images"
    syllabus = "clat_2026_syllabus.json"
    bulk_ingest_with_images(image_dir, syllabus)
