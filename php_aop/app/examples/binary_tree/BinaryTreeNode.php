<?php

namespace examples\binary_tree;

class BinaryTreeNode {

    /**
     * @var BinaryTreeNode
     */
    private $_left  = null;

    /**
     * @var BinaryTreeNode
     */
    private $_right = null;

    /**
     * @var
     */
    private $_data = null;

    /**
     * @param $data
     * @param BinaryTreeNode $left
     * @param BinaryTreeNode $right
     */
    public function __construct($data, $left, $right) {

        $this->_data = $data;
        $this->_left = $left;
        $this->_right = $right;
    }

    public function printDfs($level) {

        for ($i = 0; $i < 4 * $level; $i++) {
            echo ' ';
        }

        echo $this->_data . PHP_EOL;

        if ($this->_left) {
            $this->_left->printDfs($level + 1);
        }

        if ($this->_right) {
            $this->_right->printDfs($level + 1);
        }
    }

    public static function buildTestTree() {

        return new BinaryTreeNode(5,
            new BinaryTreeNode(7,
                new BinaryTreeNode(3, null, null),
                new BinaryTreeNode(8, null, null)),
            new BinaryTreeNode(10,
                new BinaryTreeNode(6, null, null),
                new BinaryTreeNode(18, null, null)));
    }
}