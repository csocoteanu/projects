<?php

namespace examples\fibonacci;

class Fibonacci {

    /*
     * suboptimal algorithm for computing a fibonacci number
     */
    public function computeFibonacci($number) {

        if ($number == 0 || $number == 1) {

            return $number;
        }

        return $this->computeFibonacci($number - 1) + $this->computeFibonacci($number - 2);
    }
}