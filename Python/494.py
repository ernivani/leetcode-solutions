class Solution(object):
    def findTargetSumWays(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        memo = {}
        def dfs(i, current_sum):
            if i == len(nums):
                return 1 if current_sum == target else 0
            if (i, current_sum) in memo:
                return memo[(i, current_sum)]
            
            add = dfs(i + 1, current_sum + nums[i])
            subtract = dfs(i + 1, current_sum - nums[i])
            memo[(i, current_sum)] = add + subtract
            return memo[(i, current_sum)]
        
        return dfs(0, 0)

