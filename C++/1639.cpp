#include <vector>
#include <string>
using namespace std;

class Solution {
public:
    int numWays(vector<string>& words, string target) {
        const int MOD = 1e9 + 7;
        int m = words[0].length();
        int n = target.length();
        
        vector<vector<long long>> freq(m, vector<long long>(26, 0));
        for (const string& word : words) {
            for (int i = 0; i < m; i++) {
                freq[i][word[i] - 'a']++;
            }
        }
        
        vector<vector<long long>> dp(n + 1, vector<long long>(m + 1, 0));
        dp[0][0] = 1;
        
        for (int j = 0; j <= m; j++) {
            dp[0][j] = 1;
        }
        
        for (int i = 1; i <= n; i++) {
            for (int j = i; j <= m; j++) {
                dp[i][j] = dp[i][j-1];
                
                int curr_char = target[i-1] - 'a';
                dp[i][j] = (dp[i][j] + (dp[i-1][j-1] * freq[j-1][curr_char]) % MOD) % MOD;
            }
        }
        
        return dp[n][m];
    }
}; 