<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL); 

	function print_debug_info($arg)
	{
		echo '<pre>';
		var_dump($arg);
		echo '</pre>';	
	}

	$params = $_REQUEST;
	$http_method = $_SERVER['REQUEST_METHOD'];

	print_debug_info($params);
	print_debug_info($_SERVER);

	$action = $params['action'].'Action';

    echo "Hello World<br>", $http_method, "<br>";
    echo $action;
?>
