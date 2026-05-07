import os

replacements = {
    "legal_reasoning_vault.md": "legal_vault.md",
    "english_comprehension.md": "english_vault.md",
    "current_affairs_gk_hub.md": "gk_vault.md",
    "logical_reasoning_logic.md": "logical_vault.md",
    "quantitative_techniques.md": "quant_vault.md"
}

wiki_dir = "wiki"

for root, dirs, files in os.walk(wiki_dir):
    for filename in files:
        if filename.endswith(".md"):
            filepath = os.path.join(root, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
            
            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
