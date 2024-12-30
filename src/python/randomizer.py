from typing import List, Optional
import random
import argparse

class RandomNumberGenerator:
    """A class to generate random numbers with various configuration options."""
    
    def __init__(self, seed: Optional[int] = None):
        """
        Initialize the random number generator.
        
        Args:
            seed (Optional[int]): Seed for reproducible random numbers
        """
        if seed is not None:
            random.seed(seed)
    
    def generate_numbers(
        self,
        start: int,
        end: int,
        count: int = 1,
        allow_duplicates: bool = False
    ) -> List[int]:
        """
        Generate random numbers within a specified range.
        
        Args:
            start (int): The lower bound of the range (inclusive)
            end (int): The upper bound of the range (inclusive)
            count (int): Number of random numbers to generate
            allow_duplicates (bool): Whether to allow duplicate numbers
            
        Returns:
            List[int]: List of generated random numbers
            
        Raises:
            ValueError: If input parameters are invalid
        """
        # Input validation
        if not isinstance(start, int) or not isinstance(end, int):
            raise ValueError("Start and end values must be integers")
        if start > end:
            raise ValueError("Start value must be less than or equal to end value")
        if count < 1:
            raise ValueError("Count must be at least 1")
            
        # Calculate available range
        range_size = end - start + 1
        
        # Check if unique numbers are possible when duplicates aren't allowed
        if not allow_duplicates and count > range_size:
            raise ValueError(f"Cannot generate {count} unique numbers in range {start}-{end}")
            
        if allow_duplicates:
            return [random.randint(start, end) for _ in range(count)]
        else:
            return random.sample(range(start, end + 1), count)

def _get_user_input() -> tuple:
    """Get and validate user input for the random number generator."""
    try:
        start = int(input("Enter the start of the range (inclusive): "))
        end = int(input("Enter the end of the range (inclusive): "))
        count = int(input("Enter how many numbers to generate: "))
        allow_dups = input("Allow duplicate numbers? (y/n): ").lower().startswith('y')
        return start, end, count, allow_dups
    except ValueError:
        raise ValueError("Please enter valid integer numbers")

def main():
    """Main function for command-line interface."""
    parser = argparse.ArgumentParser(description="Generate random numbers")
    parser.add_argument("--start", type=int, help="Start of range (inclusive)")
    parser.add_argument("--end", type=int, help="End of range (inclusive)")
    parser.add_argument("--count", type=int, default=1, help="Number of random numbers to generate")
    parser.add_argument("--seed", type=int, help="Random seed for reproducibility")
    parser.add_argument("--allow-duplicates", action="store_true", help="Allow duplicate numbers")
    
    args = parser.parse_args()
    
    try:
        if all(v is not None for v in [args.start, args.end, args.count]):
            # Use command line arguments
            start, end, count = args.start, args.end, args.count
            allow_duplicates = args.allow_duplicates
        else:
            # Use interactive input
            start, end, count, allow_duplicates = _get_user_input()
            
        generator = RandomNumberGenerator(seed=args.seed)
        numbers = generator.generate_numbers(start, end, count, allow_duplicates)
        
        print(f"\nGenerated random numbers: {numbers}")
        
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

if __name__ == "__main__":
    main()