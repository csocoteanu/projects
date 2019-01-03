<?php

use Go\Core\AspectKernel;
use Go\Core\AspectContainer;

/**
 * Application Aspect Kernel
 */
class ApplicationAspectKernel extends AspectKernel {

    /**
     * Configure an AspectContainer with advisors, aspects and pointcuts
     *
     * @param AspectContainer $container
     *
     * @return void
     */
    protected function configureAop(AspectContainer $container) {

        $container->registerAspect(new \aspect\LoggingAspect());
        $container->registerAspect(new \aspect\CachingAspect());

        $container->registerAspect(new \aspect\ExceptionMapperAspect(
            [
                \examples\exceptions\ExceptionA::class => \examples\exceptions\ExceptionB::class,
                \examples\exceptions\ExceptionB::class => \examples\exceptions\ExceptionA::class
            ]
        ));
    }
}
