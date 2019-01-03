<?php

include './../vendor/autoload.php';

$loadAopFramework = (count($argv) >= 2) ? ($argv[1] === '-aop') : false;

if ($loadAopFramework) {

        // bootstrapping class
        // eliminate this call and disable AOP altogether
        // more details at: https://www.slideshare.net/lisachenko/weaving-aspects-in-php-with-the-help-of-go-aop-library
        // and also: http://go.aopphp.com/docs/pointcuts-and-advices/
        ApplicationAspectKernel::getInstance()->init([
                'appDir' =>   './',
                'cacheDir' => './cache',
                'debug' => false,
                'features' => \Go\Aop\Features::INTERCEPT_FUNCTIONS,
        ]);
}

// logging example
echo '---- Starting DFS -----' . PHP_EOL;
$tree = \examples\binary_tree\BinaryTreeNode::buildTestTree();
$tree->printDfs(0);
echo '---- Ending DFS -----' . PHP_EOL;

// exception example
echo '---- Starting Exceptions Example ------' . PHP_EOL;
$exceptionExample = new \examples\exceptions\ExceptionExample();
try {

        $exceptionExample->throwsExceptionA();
} catch (\Exception $ex) {

        echo 'Caught exception: ....' . get_class($ex) . PHP_EOL; // ExceptionB
}

try {

        $exceptionExample->throwsExceptionB();
} catch (\Exception $ex) {

        echo 'Caught exception: ....' . get_class($ex) . PHP_EOL; // ExceptionA
}
echo '---- Ending Exceptions Example ----' . PHP_EOL;

// caching example
$start = microtime(true);
$fib = new \examples\fibonacci\Fibonacci();
$value = $fib->computeFibonacci(28);
$end = microtime(true);

echo 'Fibonacci run result: ===================>' . $value . ' in ' . ($end - $start) . PHP_EOL;