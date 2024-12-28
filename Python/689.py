from typing import List

class Solution:
    def maxSumOfThreeSubarrays(self, nums: List[int], k: int) -> List[int]:
        n = len(nums)
        
        subarray_sums = [0] * (n - k + 1)
        subarray_sums[0] = sum(nums[:k])
        for i in range(1, n - k + 1):
            subarray_sums[i] = subarray_sums[i - 1] - nums[i - 1] + nums[i + k - 1]
        
        left = [0] * (n - k + 1)
        best_left_index = 0
        for i in range(n - k + 1):
            if subarray_sums[i] > subarray_sums[best_left_index]:
                best_left_index = i
            left[i] = best_left_index
        
        right = [0] * (n - k + 1)
        best_right_index = n - k
        for i in range(n - k, -1, -1):
            if subarray_sums[i] >= subarray_sums[best_right_index]:
                best_right_index = i
            right[i] = best_right_index
        
        max_sum = 0
        result = []
        for mid in range(k, n - 2 * k + 1):
            l, r = left[mid - k], right[mid + k]
            total = subarray_sums[l] + subarray_sums[mid] + subarray_sums[r]
            if total > max_sum:
                max_sum = total
                result = [l, mid, r]
        
        return result
