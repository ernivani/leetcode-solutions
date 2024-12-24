using namespace std;
#include <bits/stdc++.h>

struct SegmentTree {
    int n;
    vector<int> tree; // store max of each segment

    SegmentTree(const vector<int> &arr) {
        n = (int)arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n - 1);
    }

    // Build the segment tree in O(n)
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

    // Query the maximum on [ql, qr] in O(log n)
    int queryMax(int idx, int left, int right, int ql, int qr) {
        if (qr < left || ql > right) {
            return INT_MIN; // out of range
        }
        if (ql <= left && right <= qr) {
            return tree[idx];
        }
        int mid = (left + right) / 2;
        int leftMax = queryMax(idx * 2, left, mid, ql, qr);
        int rightMax = queryMax(idx * 2 + 1, mid + 1, right, ql, qr);
        return max(leftMax, rightMax);
    }

    // Public-facing query that calls the recursive one
    int getMax(int ql, int qr) {
        if (ql > qr || ql < 0 || qr >= n) return INT_MIN;
        return queryMax(1, 0, n - 1, ql, qr);
    }

    // Find the leftmost index >= start where heights[idx] > val
    int findFirstGreater(int idx, int left, int right, int start, int val) {
        // If the segment is completely to the left of 'start', or max in segment <= val => no index
        if (right < start || tree[idx] <= val) {
            return -1;
        }
        // If we are in a leaf and tree[idx] > val => we found it
        if (left == right) {
            return left; 
        }
        int mid = (left + right) / 2;
        
        // Prioritize searching the left segment if it intersects [start..]
        // 1) If mid >= start, we check left child
        // 2) If left child doesn't have an index > val, we check right child
        int leftAns = -1;
        if (mid >= start) {
            leftAns = findFirstGreater(idx * 2, left, mid, start, val);
        }
        if (leftAns == -1) {
            // Check the right segment
            leftAns = findFirstGreater(idx * 2 + 1, mid + 1, right, start, val);
        }
        return leftAns;
    }

    // Public-facing function to find the leftmost index j in [start..n-1]
    // such that heights[j] > val
    int findFirstGreater(int start, int val) {
        // If the maximum in [start..n-1] <= val, return -1 immediately
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

        // Build segment tree on heights
        SegmentTree st(heights);

        for (int i = 0; i < (int)queries.size(); i++) {
            int a = queries[i][0];
            int b = queries[i][1];

            // Ensure a <= b
            if (a > b) {
                int tmp = a;
                a = b;
                b = tmp;
            }

            // If a == b or heights[b] > heights[a], answer is b
            if (a == b || heights[b] > heights[a]) {
                ans[i] = b;
                continue;
            }

            // Otherwise, we search for the leftmost j > b s.t. heights[j] > max(heights[a], heights[b])
            int M = max(heights[a], heights[b]);
            int j = st.findFirstGreater(b + 1, M); 
            ans[i] = j; // will be -1 if none found
        }

        return ans;
    }
};
