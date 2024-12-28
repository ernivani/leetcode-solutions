function generateParenthesis(n: number): string[] {
    const result: string[] = [];
    
    function backtrack(open: number, close: number, current: string) {
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }
        
        if (open < n) {
            backtrack(open + 1, close, current + "(");
        }
        if (close < open) {
            backtrack(open, close + 1, current + ")");
        }
    }
    
    backtrack(0, 0, "");
    return result;
} 