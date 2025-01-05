function combinationSum(candidates: number[], target: number): number[][] {
    const result: number[][] = [];
    
    candidates.sort((a, b) => a - b);
    
    function backtrack(remaining: number, current: number[], start: number): void {
        if (remaining === 0) {
            result.push([...current]);
            return;
        }
        
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) break;
            
            current.push(candidates[i]);
            backtrack(remaining - candidates[i], current, i);
            current.pop();
        }
    }
    
    backtrack(target, [], 0);
    return result;
} 