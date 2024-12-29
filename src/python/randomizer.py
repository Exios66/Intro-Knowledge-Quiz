import random

def random_number_generator(start, end, count=1):
    """
    Generates random numbers within a specified range.

    Args:
    - start (int): The lower bound of the range.
    - end (int): The upper bound of the range.
    - count (int): The number of random numbers to generate (default is 1).

    Returns:
    - list: A list of generated random numbers.
    """
    if start > end:
        raise ValueError("Start value must be less than or equal to the end value.")
    if count < 1:
        raise ValueError("Count must be at least 1.")
    if count > (end - start + 1):
        raise ValueError("Count exceeds the range of unique values available.")
    
    return random.sample(range(start, end + 1), count)

def main():
    print("Welcome to the Random Number Generator!")
    
    # Get user input for the range
    try:
        start = int(input("Enter the start of the range (inclusive): "))
        end = int(input("Enter the end of the range (inclusive): "))
        count = int(input("Enter how many numbers to generate: "))
        
        # Generate random numbers
        random_numbers = random_number_generator(start, end, count)
        
        print(f"Generated random numbers: {random_numbers}")
    
    except ValueError as e:
        print(f"Input Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()