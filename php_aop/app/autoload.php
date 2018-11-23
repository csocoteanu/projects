<?php

spl_autoload_register(function ($classname) {


    // remove heading \ from classname
    if (substr($classname,0,1) == '\\') {
        $classname = substr($classname,1);
    }

    // replace \ with /, it works both on windows and unix, path must be relative to document root that is the cwd
    $path = str_replace('\\', '/', dirname(__FILE__) . '\\' . $classname) . '.php';

    // if file does not exist do not trigger file does not exist error instead a class not found error will be triggered
    @include_once $path;
});

