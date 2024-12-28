class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function swapPairs(head: ListNode | null): ListNode | null {
    if (!head || !head.next) return head;
    
    let dummy = new ListNode(0);
    dummy.next = head;
    let prev = dummy;
    let curr: ListNode | null = head;
    
    while (curr && curr.next) {
        let first = curr;
        let second = curr.next;
        
        prev.next = second;
        first.next = second.next;
        second.next = first;
        
        prev = first;
        curr = first.next;
    }
    
    return dummy.next;
} 