import pandas as pd
import random

def load_data(literature_path, mathematics_path):
    """
    Load and combine data from multiple CSV files.
    
    Args:
    - literature_path (str): Path to the Literature questions CSV file.
    - mathematics_path (str): Path to the Mathematics questions CSV file.
    
    Returns:
    - pd.DataFrame: Combined dataframe of questions.
    """
    literature_questions = pd.read_csv(literature_path)
    mathematics_questions = pd.read_csv(mathematics_path)
    all_questions = pd.concat([literature_questions, mathematics_questions], ignore_index=True)
    return all_questions

def random_question_selector(dataframe, difficulty=None, category=None):
    """
    Randomly selects a question based on given difficulty and category.
    If no difficulty or category is provided, selects randomly across all data.
    
    Args:
    - dataframe (pd.DataFrame): Dataframe containing the questions.
    - difficulty (int, optional): Difficulty level (0, 1, or 2).
    - category (str, optional): Knowledge category (e.g., "Literature", "Mathematics").
    
    Returns:
    - dict: A dictionary representing the randomly selected question.
    """
    # Filter by difficulty and category if specified
    filtered_df = dataframe.copy()
    if difficulty is not None:
        filtered_df = filtered_df[filtered_df['difficulty'] == difficulty]
    if category is not None:
        filtered_df = filtered_df[filtered_df['Knowledge Category'] == category]
    
    # Randomly select a question
    if not filtered_df.empty:
        selected_question = filtered_df.sample(1).iloc[0].to_dict()
        return selected_question
    else:
        return {"Error": "No questions match the criteria provided."}

def main():
    # Paths to the CSV files
    literature_path = 'path/to/Refined_Literature_Questions.csv'
    mathematics_path = 'path/to/Refined_Mathematics_Questions.csv'
    
    # Load and combine the data
    all_questions = load_data(literature_path, mathematics_path)
    
    # Example usage: Randomly select a question with specified criteria
    print("Example 1: Difficulty 1, Category 'Literature'")
    question1 = random_question_selector(all_questions, difficulty=1, category="Literature")
    print(question1)
    
    print("\nExample 2: Difficulty 2, Category 'Mathematics'")
    question2 = random_question_selector(all_questions, difficulty=2, category="Mathematics")
    print(question2)
    
    print("\nExample 3: Random selection without criteria")
    question3 = random_question_selector(all_questions)
    print(question3)

if __name__ == "__main__":
    main()