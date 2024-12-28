function minimumReplacement(nums: number[]): number {
    let operations = 0;
    let n = nums.length;
    let prevMax = nums[n - 1];
    
    for (let i = n - 2; i >= 0; i--) {
        let parts = Math.ceil(nums[i] / prevMax);
        
        operations += parts - 1;
        
        prevMax = Math.floor(nums[i] / parts);
    }
    
    return operations;
} 