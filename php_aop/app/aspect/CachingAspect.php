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

class CachingAspect implements Aspect {

    private $_cachedValues = [ ]; // can be used more generically
                                  // e.g.: it can cache method call name (and class) along with the other input parameters

    /**
     *
     * @param MethodInvocation $invocation
     *
     * @Around("execution(public examples\fibonacci\Fibonacci->computeFibonacci(*))")
     *
     * @return mixed
     */
    public function aroundMethodExecution(MethodInvocation $invocation) {

        $arguments  = $invocation->getArguments();
        $inputValue = null;

        if (count($arguments) > 0) {

            $inputValue = $arguments[0];
        }

        if (isset($this->_cachedValues[$inputValue])) {

            return $this->_cachedValues[$inputValue];
        }

        $result = $invocation->proceed();
        if (!is_null($inputValue)) {

            $this->_cachedValues[$inputValue] = $result;
        }

        return $result;
    }
}
