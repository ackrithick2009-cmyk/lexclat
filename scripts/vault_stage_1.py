import os
import subprocess

def vault_stage_1():
    files = [
        "scratch/stage1/Legal_Ch10.md",
        "scratch/stage1/Quant_Ch89.md",
        "scratch/stage1/GK_Ch42.md"
    ]
    
    for f in files:
        if os.path.exists(f):
            subject = "Legal" if "Legal" in f else ("Quant" if "Quant" in f else "GK")
            print(f"Vaulting {f}...")
            subprocess.run(["python", "scripts/agent2_architect.py", f, subject])

if __name__ == "__main__":
    vault_stage_1()
