<?php
namespace aspect;

use Go\Aop\Aspect;
use Go\Aop\Intercept\FieldAccess;
use Go\Aop\Intercept\FunctionInvocation;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Around;
use Go\Lang\Annotation\Pointcut;


class LoggingAspect implements Aspect {

    /**
     *
     * @param MethodInvocation $invocation
     *
     * @Around("execution(public examples\binary_tree\BinaryTreeNode->*(*))")
     *
     * @return mixed
     */
    public function aroundMethodExecution(MethodInvocation $invocation) {

        echo "Starting calling: " . $invocation->getMethod()->name . " with args: " .  $invocation->getArguments()[0] . PHP_EOL;

        $startTime = microtime(true);
        $result = $invocation->proceed();
        $endTime = microtime(true);

        echo "End calling: " . $invocation->getMethod()->name . " with args: " .  $invocation->getArguments()[0] . " in: " . ($endTime - $startTime) . PHP_EOL;

        return $result;
    }
}
