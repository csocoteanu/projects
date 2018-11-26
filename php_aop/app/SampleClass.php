<?php

class SampleClass {

    public function testCondition($test = "test") {
        echo "Test condition working fine\n";
    }

    public function computeFibonacci($number) {

        if ($number == 0 || $number == 1) {

            return $number;
        }

        return $this->computeFibonacci($number - 1) + $this->computeFibonacci($number - 2);
    }
}