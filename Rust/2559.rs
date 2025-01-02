impl Solution {
    pub fn vowel_strings(words: Vec<String>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = words.len();
        let mut prefix_sum = vec![0; n + 1];
        
        let is_vowel = |c: char| -> bool {
            matches!(c, 'a' | 'e' | 'i' | 'o' | 'u')
        };
        
        for i in 0..n {
            let word = &words[i];
            let is_vowel_string = if let (Some(first), Some(last)) = (word.chars().next(), word.chars().last()) {
                is_vowel(first) && is_vowel(last)
            } else {
                false
            };
            
            prefix_sum[i + 1] = prefix_sum[i] + if is_vowel_string { 1 } else { 0 };
        }
        
        queries.iter().map(|q| {
            let left = q[0] as usize;
            let right = q[1] as usize;
            prefix_sum[right + 1] - prefix_sum[left]
        }).collect()
    }
} 