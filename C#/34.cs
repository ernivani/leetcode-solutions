public class Solution {
    public int[] SearchRange(int[] nums, int target) {
        int[] result = new int[] { -1, -1 };
        
        result[0] = BinarySearch(nums, target, true);
        
        if (result[0] == -1) {
            return result;
        }
        
        result[1] = BinarySearch(nums, target, false);
        
        return result;
    }
    
    private int BinarySearch(int[] nums, int target, bool leftmost) {
        int left = 0;
        int right = nums.Length - 1;
        int index = -1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (nums[mid] == target) {
                index = mid;
                if (leftmost) {
                    right = mid - 1; 
                } else {
                    left = mid + 1; 
                }
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return index;
    }
} 