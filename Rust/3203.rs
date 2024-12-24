impl Solution {
    pub fn minimum_diameter_after_merge(edges1: Vec<Vec<i32>>, edges2: Vec<Vec<i32>>) -> i32 {
        use std::collections::HashMap;

        fn build_graph(edges: &Vec<Vec<i32>>) -> HashMap<i32, Vec<i32>> {
            let mut graph = HashMap::new();
            for edge in edges {
                let (u, v) = (edge[0], edge[1]);
                graph.entry(u).or_insert(vec![]).push(v);
                graph.entry(v).or_insert(vec![]).push(u);
            }
            graph
        }

        fn dfs_farthest(
            graph: &HashMap<i32, Vec<i32>>,
            start: i32,
            parent: i32,
            dist: i32,
        ) -> (i32, i32) {
            let mut farthest_node = start;
            let mut max_dist = dist;

            if let Some(neighbors) = graph.get(&start) {
                for &next in neighbors {
                    if next == parent {
                        continue;
                    }
                    let (candidate_node, candidate_dist) = dfs_farthest(graph, next, start, dist + 1);
                    if candidate_dist > max_dist {
                        max_dist = candidate_dist;
                        farthest_node = candidate_node;
                    }
                }
            }
            (farthest_node, max_dist)
        }

        fn diameter_of_tree(edges: &Vec<Vec<i32>>) -> i32 {
            if edges.is_empty() {
                return 0;
            }

            let graph = build_graph(edges);
            let start_node = edges[0][0];
            let (far_node, _) = dfs_farthest(&graph, start_node, -1, 0);
            let (_, diam) = dfs_farthest(&graph, far_node, -1, 0);
            diam
        }

        let d1 = diameter_of_tree(&edges1);
        let d2 = diameter_of_tree(&edges2);

        let r1 = (d1 + 1) / 2;
        let r2 = (d2 + 1) / 2;

        let combined_diameter = d1.max(d2).max(r1 + r2 + 1);

        if edges1.is_empty() && edges2.is_empty() {
            return 1;
        }

        combined_diameter
    }
}
