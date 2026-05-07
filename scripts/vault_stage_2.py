import os
import subprocess

def vault_stage_2():
    files = [
        ("scratch/stage2/Legal_Ch11.md", "Legal", "Legal_Chapter_11.md"),
        ("scratch/stage2/English_Ch74.md", "English", "English_Chapter_74.md"),
        ("scratch/stage2/English_Ch71.md", "English", "English_Chapter_71.md"),
        ("scratch/stage2/Quant_Ch90.md", "Quant", "Quant_Chapter_90.md")
    ]
    
    for f, subject, final_name in files:
        if os.path.exists(f):
            print(f"Vaulting {f}...")
            # We use subprocess to call the architect
            subprocess.run(["python", "scripts/agent2_architect.py", f, subject])
            
            # Now rename the polished file
            base_name = os.path.basename(f).replace(".md", "")
            polished_path = f"wiki/{subject.lower()}_vault/{base_name}_Polished.md"
            final_path = f"wiki/{subject.lower()}_vault/{final_name}"
            
            if os.path.exists(polished_path):
                import shutil
                shutil.move(polished_path, final_path)
                print(f"  Saved to {final_path}")

if __name__ == "__main__":
    vault_stage_2()
