<?php
class Solution {

    /**
     * @param Integer[] $nums
     * @param Integer $val
     * @return Integer
     */
    function removeElement(&$nums, $val) {
        $count = 0;
        foreach ($nums as $num) {
            if ($num !== $val) {
                $nums[$count++] = $num;
            }
        }
        return $count;
    }
}