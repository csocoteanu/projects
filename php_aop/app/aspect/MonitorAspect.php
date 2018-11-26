<?php
namespace aspect;

use Go\Aop\Aspect;
use Go\Aop\Intercept\FieldAccess;
use Go\Aop\Intercept\MethodInvocation;
use Go\Lang\Annotation\After;
use Go\Lang\Annotation\Before;
use Go\Lang\Annotation\Around;
use Go\Lang\Annotation\Pointcut;


class MonitorAspect implements Aspect
{

    /**
     * @param MethodInvocation $invocation Invocation
     * @Before("execution(public SampleClass->*(*))")
     */
    public function beforeMethodExecution(MethodInvocation $invocation) {

        echo "calling: " . $invocation->getMethod()->name . " with args: " .  $invocation->getArguments()[0] . PHP_EOL;
    }
}