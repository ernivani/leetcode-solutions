function countAndSay(n: number): string {
    if (n === 1) return "1";
    
    const prev = countAndSay(n - 1);
    let result = "";
    let count = 1;
    let currentDigit = prev[0];
    
    for (let i = 1; i < prev.length; i++) {
        if (prev[i] === currentDigit) {
            count++;
        } else {
            result += count.toString() + currentDigit;
            currentDigit = prev[i];
            count = 1;
        }
    }
    
    result += count.toString() + currentDigit;
    
    return result;
} 