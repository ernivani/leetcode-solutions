public class Solution {
    public string SmallestNumber(string num, long t) {

        var factors = GetFactors(t);
        var min = GetMin(factors.p2, factors.p3, factors.p5, factors.p7);

        if (factors.r != 1)
        return "-1";

        if (Compare(min, num.TrimStart('0', '1')) >= 0) 
        {
            if (min.Length >= num.Length) 
            {
                return min;
            } 
            else 
            {
                return new string('1', num.Length - min.Length) + min;
            }
        }

        StringBuilder resbuild = new StringBuilder(num);

        if (AddMin(0, (factors.p2, factors.p3, factors.p5, factors.p7), resbuild))
        return resbuild.ToString();

        string prefix = new string('1', num.Length - min.Length + 1);

        return prefix + min;
    }

    private bool AddMin(int start, (int p2, int p3, int p5, int p7) factors, StringBuilder num) {

        if (start >= num.Length)
        return factors.p2 == 0 && factors.p3 == 0 && factors.p5 == 0 && factors.p7 == 0;

        int suffix = num.Length - start;

        if (MinLength(factors.p2, factors.p3, factors.p5, factors.p7) > suffix) 
        {
            num[start] = '1';

            return false;
        }

        int current = num[start] - '0';

        if (current == 0) 
        {
            var min = GetMin(factors.p2, factors.p3, factors.p5, factors.p7);
            int posMin = min.Length - 1;
            int posNum = num.Length - 1;

            while (posNum >= start) 
            {
                if (posMin >= 0) 
                {
                    num[posNum--] = min[posMin--];
                } 
                else 
                {
                    num[posNum--] = '1';
                }
            }
            return true;
        } 
        else 
        {
            for (int cd = current; cd <= 9; cd++) 
            {
                int nd = cd;
                int np2 = factors.p2, np3 = factors.p3, np5 = factors.p5, np7 = factors.p7;

                while (np2 > 0 && nd % 2 == 0) 
                { 
                    np2--; nd /= 2; 
                }
                while (np3 > 0 && nd % 3 == 0) 
                { 
                    np3--; nd /= 3; 
                }
                while (np5 > 0 && nd % 5 == 0) 
                { 
                    np5--; nd /= 5; 
                }
                while (np7 > 0 && nd % 7 == 0) 
                { 
                    np7--; nd /= 7; 
                }
                if (AddMin(start + 1, (np2, np3, np5, np7), num)) 
                {
                    num[start] = (char)('0' + cd);
                    
                    return true;
                }
            }
            num[start] = '1';

            return false;
        }
    }

    private (int p2, int p3, int p5, int p7, long r) GetFactors(long n) {

        int p2 = 0, p3 = 0, p5 = 0, p7 = 0;

        while (n % 2 == 0) 
        { 
            p2++; n /= 2; 
        }
        while (n % 3 == 0) 
        { 
            p3++; n /= 3; 
        }
        while (n % 5 == 0) 
        { 
            p5++; n /= 5; 
        }
        while (n % 7 == 0) 
        { 
            p7++; n /= 7; 
        }
        return (p2, p3, p5, p7, n);
    }

    private int MinLength(int p2, int p3, int p5, int p7) {

        int n9 = p3 / 2;
        p3 %= 2;
        int n8 = p2 / 3;
        p2 %= 3;
        int n7 = p7;
        int n6 = Math.Min(p2, p3);
        p2 -= n6;
        p3 -= n6;
        int n5 = p5;
        int n4 = p2 / 2;
        p2 %= 2;
        int n3 = p3;
        int n2 = p2;

        return n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9;
    }

    private string GetMin(int p2, int p3, int p5, int p7) {

        int n9 = p3 / 2;
        p3 %= 2;
        int n8 = p2 / 3;
        p2 %= 3;
        int n7 = p7;
        int n6 = Math.Min(p2, p3);
        p2 -= n6;
        p3 -= n6;
        int n5 = p5;
        int n4 = p2 / 2;
        p2 %= 2;
        int n3 = p3;
        int n2 = p2;

        return
        new string('2', n2) +
        new string('3', n3) +
        new string('4', n4) +
        new string('5', n5) +
        new string('6', n6) +
        new string('7', n7) +
        new string('8', n8) +
        new string('9', n9);
    }

    private int Compare(string a, string b) {

        if (a.Length != b.Length) 
        return a.Length.CompareTo(b.Length);
        return string.Compare(a, b);
    }
}