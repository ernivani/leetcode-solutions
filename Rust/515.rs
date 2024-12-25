// Definition for a binary tree node.
// #[derive(Debug, PartialEq, Eq)]
// pub struct TreeNode {
//   pub val: i32,
//   pub left: Option<Rc<RefCell<TreeNode>>>,
//   pub right: Option<Rc<RefCell<TreeNode>>>,
// }
// 
// impl TreeNode {
//   #[inline]
//   pub fn new(val: i32) -> Self {
//     TreeNode {
//       val,
//       left: None,
//       right: None
//     }
//   }
// }
use std::rc::Rc;
use std::cell::RefCell;
impl Solution {
    pub fn largest_values(root: Option<Rc<RefCell<TreeNode>>>) -> Vec<i32> {
        let mut result = vec![];
        if root.is_none() {
            return result;
        }
        
        let mut queue = vec![root];
        while !queue.is_empty() {
            let level_size = queue.len();
            let mut max_val = i32::MIN;
            
            for _ in 0..level_size {
                if let Some(node) = queue.remove(0) {
                    let node = node.borrow();
                    max_val = max_val.max(node.val);
                    
                    if let Some(left) = &node.left {
                        queue.push(Some(left.clone()));
                    }
                    if let Some(right) = &node.right {
                        queue.push(Some(right.clone()));
                    }
                }
            }
            result.push(max_val);
        }
        result
    }
}