function shiftingLetters(s: string, shifts: number[][]): string {
    const n = s.length;
    const diff = new Array(n + 1).fill(0);
    
    for (const [start, end, direction] of shifts) {
        const shift = direction === 1 ? 1 : -1;
        diff[start] += shift;
        diff[end + 1] -= shift;
    }
    
    let currentShift = 0;
    return s.split('').map((char, i) => {
        currentShift = (currentShift + diff[i]) % 26;
        // Handle negative shifts
        let finalShift = ((char.charCodeAt(0) - 97 + currentShift) % 26 + 26) % 26;
        return String.fromCharCode(97 + finalShift);
    }).join('');
} 