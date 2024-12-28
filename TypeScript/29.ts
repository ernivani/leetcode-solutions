function divide(dividend: number, divisor: number): number {
    const MAX_INT = 2147483647;
    const MIN_INT = -2147483648;
    
    if (dividend === MIN_INT && divisor === -1) {
        return MAX_INT;
    }
    
    const sign = (dividend < 0) !== (divisor < 0) ? -1 : 1;
    let dvd = Math.abs(dividend);
    let dvs = Math.abs(divisor);
    
    let result = 0;
    while (dvd >= dvs) {
        let temp = dvs;
        let multiple = 1;
        
        while (dvd >= (temp << 1) && (temp << 1) > 0) {
            temp <<= 1;
            multiple <<= 1;
        }
        
        dvd -= temp;
        result += multiple;
    }
    
    return sign * result;
} 