impl Solution {
    pub fn ways_to_split_array(nums: Vec<i32>) -> i32 {
        let mut prefix_sum = vec![0i64; nums.len() + 1];
        for i in 0..nums.len() {
            prefix_sum[i + 1] = prefix_sum[i] + nums[i] as i64;
        }
        let mut result = 0;
        for i in 1..nums.len() {
            if prefix_sum[i] >= prefix_sum[nums.len()] - prefix_sum[i] {
                result += 1;
            }
        }
        result
    }
}