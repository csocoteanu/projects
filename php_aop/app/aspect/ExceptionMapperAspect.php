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
Use Go\Lang\Annotation\AfterThrowing;


class ExceptionMapperAspect implements Aspect {

    private $_exceptionMap;

    /**
     * @param $exceptionMap array
     */
    public function __construct(array $exceptionMap) {

        $this->_exceptionMap = $exceptionMap;
    }

    /**
     * @param MethodInvocation $invocation Invocation
     * @param \Exception $thrownException
     * @AfterThrowing("execution(public examples\exceptions\ExceptionExample->*(*))")
     */
    public function onExceptionThrown(MethodInvocation $invocation, \Exception $thrownException) {

        $exceptionInstance = $thrownException;
        $exceptionType     = get_class($thrownException);

        if (isset($this->_exceptionMap[$exceptionType])) {

            $exceptionInstance = new $this->_exceptionMap[$exceptionType]();
        }

        throw $exceptionInstance;
    }
}
