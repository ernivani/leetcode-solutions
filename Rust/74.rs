impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        let m = matrix.len();
        let n = matrix[0].len();
        let total = m * n;
        
        let mut left = 0;
        let mut right = total - 1;
        
        while left <= right {
            let mid = left + (right - left) / 2;
            let row = mid / n;
            let col = mid % n;
            let value = matrix[row][col];
            
            if value == target {
                return true;
            } else if value < target {
                left = mid + 1;
            } else {
                if mid == 0 {
                    return false;
                }
                right = mid - 1;
            }
        }
        
        false
    }
}