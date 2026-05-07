import os
import subprocess

def vault_stage_4():
    files = [
        ("scratch/stage4/Legal_Ch13.md", "Legal", "Legal_Chapter_13.md"),
        ("scratch/stage4/GK_Ch45.md", "GK", "GK_Chapter_45.md"),
        ("scratch/stage4/GK_Ch61.md", "GK", "GK_Chapter_61.md"),
        ("scratch/stage4/Quant_Ch91.md", "Quant", "Quant_Chapter_91.md")
    ]
    
    for f, subject, final_name in files:
        if os.path.exists(f):
            print(f"Vaulting {f}...")
            subprocess.run(["python", "scripts/agent2_architect.py", f, subject])
            
            base_name = os.path.basename(f).replace(".md", "")
            polished_path = f"wiki/{subject.lower()}_vault/{base_name}_Polished.md"
            final_path = f"wiki/{subject.lower()}_vault/{final_name}"
            
            if os.path.exists(polished_path):
                import shutil
                shutil.move(polished_path, final_path)
                print(f"  Saved to {final_path}")

if __name__ == "__main__":
    vault_stage_4()
