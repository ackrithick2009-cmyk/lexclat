import os
import json
import random

def generate_mega_quiz():
    quiz_dir = "wiki/quizzes"
    all_quizzes = []
    
    for filename in os.listdir(quiz_dir):
        if filename.endswith(".json") and filename != "MegaSummaryQuiz.json":
            with open(os.path.join(quiz_dir, filename), "r", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                    if "quizzes" in data:
                        # Take 2-3 questions from each chapter
                        sample = random.sample(data["quizzes"], min(len(data["quizzes"]), 2))
                        all_quizzes.extend(sample)
                except Exception as e:
                    print(f"Error reading {filename}: {e}")
    
    # Shuffle for a real mixed test experience
    random.shuffle(all_quizzes)
    
    # Limit to 30 high-impact questions
    mega_quiz = {"quizzes": all_quizzes[:30]}
    
    output_path = "wiki/quizzes/MegaSummaryQuiz.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(mega_quiz, f, indent=2)
    
    print(f"Mega Summary Quiz generated with {len(mega_quiz['quizzes'])} questions at {output_path}")

if __name__ == "__main__":
    generate_mega_quiz()
