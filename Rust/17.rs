impl Solution {
    pub fn letter_combinations(digits: String) -> Vec<String> {
        if digits.is_empty() {
            return vec![];
        }
        
        let phone_map: Vec<&str> = vec![
            "", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"
        ];
        
        let mut result = vec![String::new()];
        
        for digit in digits.chars() {
            let digit = digit.to_digit(10).unwrap() as usize;
            let mut new_result = Vec::new();
            
            for combination in result {
                for letter in phone_map[digit].chars() {
                    let mut new_combination = combination.clone();
                    new_combination.push(letter);
                    new_result.push(new_combination);
                }
            }
            
            result = new_result;
        }
        
        result
    }
} 