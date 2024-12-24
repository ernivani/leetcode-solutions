# Definition for a binary tree node.
# class TreeNode(object):
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

class Solution(object):
    def minimumOperations(self, root):
        from collections import deque
        
        if not root:
            return 0
        
        queue = deque([root])
        total_swaps = 0
        
        while queue:
            level_size = len(queue)
            level_values = []
            
            for _ in range(level_size):
                node = queue.popleft()
                level_values.append(node.val)
                
                if node.left:
                    queue.append(node.left)
                if node.right:
                    queue.append(node.right)
            
            total_swaps += self._min_swaps_to_sort(level_values)
        
        return total_swaps
    
    def _min_swaps_to_sort(self, arr):
        """
        Returns the minimum number of swaps to sort the array 'arr'.
        Each number in 'arr' is unique (as per the problem statement).
        We use cycle decomposition in the permutation to count swaps.
        """
        sorted_arr = sorted(arr)
        val_to_idx = {v: i for i, v in enumerate(sorted_arr)}
        
        visited = [False] * len(arr)
        swaps = 0
        
        for i in range(len(arr)):
            if visited[i] or val_to_idx[arr[i]] == i:
                continue
            
            cycle_size = 0
            j = i
            
            while not visited[j]:
                visited[j] = True
                j = val_to_idx[arr[j]]
                cycle_size += 1
            
            if cycle_size > 0:
                swaps += (cycle_size - 1)
        
        return swaps
