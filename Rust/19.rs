// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
// 
// impl ListNode {
//   #[inline]
//   fn new(val: i32) -> Self {
//     ListNode {
//       next: None,
//       val
//     }
//   }
// }
impl Solution {
    pub fn remove_nth_from_end(head: Option<Box<ListNode>>, n: i32) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut length = 0;
        let mut curr = dummy.next.as_ref();
        
        while let Some(node) = curr {
            length += 1;
            curr = node.next.as_ref();
        }
        
        let mut curr = &mut dummy;
        for _ in 0..length - n {
            curr = curr.next.as_mut().unwrap();
        }
        
        let next = curr.next.as_mut().and_then(|node| node.next.take());
        curr.next = next;
        
        dummy.next
    }
}