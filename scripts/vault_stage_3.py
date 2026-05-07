import os
import subprocess

def vault_stage_3():
    files = [
        ("scratch/stage3/Legal_Ch12.md", "Legal", "Legal_Chapter_12.md"),
        ("scratch/stage3/GK_Ch48.md", "GK", "GK_Chapter_48.md"),
        ("scratch/stage3/GK_Ch14.md", "GK", "GK_Chapter_14.md")
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
    vault_stage_3()
