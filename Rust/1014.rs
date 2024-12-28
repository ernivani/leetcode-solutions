impl Solution {
    pub fn max_score_sightseeing_pair(values: Vec<i32>) -> i32 {
        let mut max_score = 0;
        let mut max_value_plus_i = values[0] + 0; // values[i] + i

        for j in 1..values.len() {
            // Current score would be (values[i] + i) + (values[j] - j)
            let score = max_value_plus_i + (values[j] - j as i32);
            max_score = max_score.max(score);
            
            // Update max_value_plus_i for the next iteration
            max_value_plus_i = max_value_plus_i.max(values[j] + j as i32);
        }

        max_score
    }
} 