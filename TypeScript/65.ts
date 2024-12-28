function isNumber(s: string): boolean {
    s = s.trim();
    
    let seenDigit = false;
    let seenExponent = false;
    let seenDot = false;
    let seenSign = false;
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            seenDigit = true;
        } else if (char === 'e' || char === 'E') {
            if (seenExponent || !seenDigit) return false;
            seenExponent = true;
            seenDigit = false;
            seenSign = false;
            seenDot = false;
        } else if (char === '.') {
            if (seenDot || seenExponent) return false;
            seenDot = true;
        } else if (char === '+' || char === '-') {
            if (seenSign || (i > 0 && s[i-1] !== 'e' && s[i-1] !== 'E')) return false;
            seenSign = true;
        } else {
            return false;
        }
    }
    
    return seenDigit;
} 