import os
import pypdf

def split_pdf(input_path, output_dir, chunk_size=50):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        
    reader = pypdf.PdfReader(input_path)
    total_pages = len(reader.pages)
    print(f"Splitting {input_path} ({total_pages} pages) into chunks of {chunk_size}...")
    
    for i in range(0, total_pages, chunk_size):
        writer = pypdf.PdfWriter()
        end = min(i + chunk_size, total_pages)
        for page_num in range(i, end):
            writer.add_page(reader.pages[page_num])
            
        chunk_name = f"chunk_{i//chunk_size + 1}_{i+1}-{end}.pdf"
        chunk_path = os.path.join(output_dir, chunk_name)
        with open(chunk_path, "wb") as f:
            writer.write(f)
        print(f"Created {chunk_path}")

if __name__ == "__main__":
    pdf = r"C:\Users\acdur\Downloads\Merged PDF 20260506 18.53.21_compress - converted (1) (1).pdf"
    split_pdf(pdf, "scratch/chunks")
