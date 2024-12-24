using namespace std;
#include <bits/stdc++.h>

struct SegmentTree {
    int n;
    vector<int> tree;

    SegmentTree(const vector<int> &arr) {
        n = (int)arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }

    void build(const vector<int> &arr, int idx, int left, int right) {
        if (left == right) {
            tree[idx] = arr[left];
            return;
        }
        int mid = (left + right) / 2;
        build(arr, idx * 2, left, mid);
        build(arr, idx * 2 + 1, mid + 1, right);
        tree[idx] = max(tree[idx * 2], tree[idx * 2 + 1]);
    }

    int queryMax(int idx, int left, int right, int ql, int qr) {
        if (qr < left || ql > right) {
            return INT_MIN;
        }
        if (ql <= left && right <= qr) {
            return tree[idx];
        }
        int mid = (left + right) / 2;
        int leftMax = queryMax(idx * 2, left, mid, ql, qr);
        int rightMax = queryMax(idx * 2 + 1, mid + 1, right, ql, qr);
        return max(leftMax, rightMax);
    }

    int getMax(int ql, int qr) {
        if (ql > qr || ql < 0 || qr >= n) return INT_MIN;
        return queryMax(1, 0, n - 1, ql, qr);
    }

    int findFirstGreater(int idx, int left, int right, int start, int val) {
        if (right < start || tree[idx] <= val) {
            return -1;
        }
        if (left == right) {
            return left; 
        }
        int mid = (left + right) / 2;
        
        int leftAns = -1;
        if (mid >= start) {
            leftAns = findFirstGreater(idx * 2, left, mid, start, val);
        }
        if (leftAns == -1) {
            leftAns = findFirstGreater(idx * 2 + 1, mid + 1, right, start, val);
        }
        return leftAns;
    }

    int findFirstGreater(int start, int val) {
        int maximum = getMax(start, n - 1);
        if (maximum <= val) return -1;
        return findFirstGreater(1, 0, n - 1, start, val);
    }
};

class Solution {
public:
    vector<int> leftmostBuildingQueries(vector<int>& heights, vector<vector<int>>& queries) {
        int n = (int)heights.size();
        vector<int> ans(queries.size(), -1);

        SegmentTree st(heights);

        for (int i = 0; i < (int)queries.size(); i++) {
            int a = queries[i][0];
            int b = queries[i][1];

            if (a > b) {
                int tmp = a;
                a = b;
                b = tmp;
            }

            if (a == b || heights[b] > heights[a]) {
                ans[i] = b;
                continue;
            }

            int M = max(heights[a], heights[b]);
            int j = st.findFirstGreater(b + 1, M); 
            ans[i] = j;
        }

        return ans;
    }
};
