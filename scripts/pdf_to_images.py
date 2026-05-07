import os
import fitz
import sys

def convert_to_images(pdf_path, output_dir, pages=None):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    doc = fitz.open(pdf_path)
    total = len(doc)
    print(f"Opening {pdf_path} ({total} pages)...")
    
    if pages is None:
        pages = range(total)
        
    for p_num in pages:
        if p_num >= total:
            continue
        page = doc.load_page(p_num)
        pix = page.get_pixmap(matrix=fitz.Matrix(2, 2)) # 2x scale for better OCR
        output_path = os.path.join(output_dir, f"page_{p_num+1}.png")
        pix.save(output_path)
        print(f"Saved {output_path}")

if __name__ == "__main__":
    pdf = r"C:\Users\acdur\Downloads\Merged PDF 20260506 18.53.21_compress - converted (1) (1).pdf"
    
    if len(sys.argv) > 1:
        p_idx = int(sys.argv[1])
        convert_to_images(pdf, "scratch/images", pages=[p_idx])
    else:
        # Convert first 5 pages for mapping
        convert_to_images(pdf, "scratch/images", pages=range(5))
