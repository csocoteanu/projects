<?php

include 'autoload.php';
include './../vendor/autoload.php';


ApplicationAspectKernel::getInstance()->init([
        'appDir' =>   './',
        'cacheDir' => './cache',
        'includePaths' => ['./aspect'],
        'debug' => true,
        'features' => \Go\Aop\Features::INTERCEPT_FUNCTIONS,
]);

$sampleClass = new SampleClass();
$sampleClass->testCondition();
