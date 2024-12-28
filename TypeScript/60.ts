function getPermutation(n: number, k: number): string {
    const factorial: number[] = [1];
    for (let i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
    }
    
    const numbers: number[] = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    
    k = k - 1;
    
    let result = '';
    
    for (let i = n; i > 0; i--) {
        const index = Math.floor(k / factorial[i - 1]);
        k = k % factorial[i - 1];
        
        result += numbers[index];
        
        numbers.splice(index, 1);
    }
    
    return result;
} 