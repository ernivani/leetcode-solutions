function maxScore(s: string): number {
    let ones = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') ones++;
    }
    
    let maxScore = 0;
    let zeros = 0;
    
    for (let i = 0; i < s.length - 1; i++) {
        if (s[i] === '0') {
            zeros++;
        } else {
            ones--;
        }
        maxScore = Math.max(maxScore, zeros + ones);
    }
    
    return maxScore;
}