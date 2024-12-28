function totalNQueens(n: number): number {
    let count = 0;
    const cols = new Set<number>();
    const posDiag = new Set<number>();
    const negDiag = new Set<number>();
    
    function backtrack(row: number): void {
        if (row === n) {
            count++;
            return;
        }
        
        for (let col = 0; col < n; col++) {
            if (cols.has(col) || posDiag.has(row + col) || negDiag.has(row - col)) {
                continue;
            }
            
            cols.add(col);
            posDiag.add(row + col);
            negDiag.add(row - col);
            
            backtrack(row + 1);
            
            cols.delete(col);
            posDiag.delete(row + col);
            negDiag.delete(row - col);
        }
    }
    
    backtrack(0);
    return count;
} 