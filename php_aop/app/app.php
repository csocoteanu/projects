<?php

include './../vendor/autoload.php';


ApplicationAspectKernel::getInstance()->init([
        'appDir' =>   './',
        'cacheDir' => './cache',
        'debug' => false,
        'features' => \Go\Aop\Features::INTERCEPT_FUNCTIONS,
]);

$sampleClass = new SampleClass();
$value = $sampleClass->computeFibonacci(24);

echo '===================>' . $value;

