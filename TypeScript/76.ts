function minWindow(s: string, t: string): string {
    if (t.length > s.length) return "";
    
    const targetMap = new Map<string, number>();
    for (const char of t) {
        targetMap.set(char, (targetMap.get(char) || 0) + 1);
    }
    
    let left = 0;
    let right = 0;
    let minLen = Infinity;
    let minStart = 0;
    let requiredChars = targetMap.size;
    let formedChars = 0;
    const windowMap = new Map<string, number>();
    
    while (right < s.length) {
        const char = s[right];
        windowMap.set(char, (windowMap.get(char) || 0) + 1);
        
        if (targetMap.has(char) && windowMap.get(char) === targetMap.get(char)) {
            formedChars++;
        }
        
        while (formedChars === requiredChars && left <= right) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            const leftChar = s[left];
            windowMap.set(leftChar, windowMap.get(leftChar)! - 1);
            
            if (targetMap.has(leftChar) && windowMap.get(leftChar)! < targetMap.get(leftChar)!) {
                formedChars--;
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? "" : s.slice(minStart, minStart + minLen);
} 