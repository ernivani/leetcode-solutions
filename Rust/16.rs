impl Solution {
    pub fn three_sum_closest(mut nums: Vec<i32>, target: i32) -> i32 {
        nums.sort();
        let n = nums.len();
        let mut closest = nums[0] + nums[1] + nums[2];
        
        for i in 0..n-2 {
            let mut left = i + 1;
            let mut right = n - 1;
            
            while left < right {
                let sum = nums[i] + nums[left] + nums[right];
                if sum == target {
                    return sum;
                }
                
                if (sum - target).abs() < (closest - target).abs() {
                    closest = sum;
                }
                
                if sum < target {
                    left += 1;
                } else {
                    right -= 1;
                }
            }
        }
        
        closest
    }
} 