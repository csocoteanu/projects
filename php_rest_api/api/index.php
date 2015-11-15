<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL); 

	function print_debug_info($arg)
	{
		echo '<pre>';
		var_dump($arg);
		echo '</pre>';	
	}

	include_once 'controller/CRUDController.php';

	$result = null;
	$params = $_REQUEST;
	$http_method = $_SERVER['REQUEST_METHOD'];
	$crud_controller = CRUDController::getInstance();

	// print_debug_info($params);
	// print_debug_info($_SERVER);
	
	switch ($http_method) {
		case 'GET':
			$result = $crud_controller->readAction($params);
			break;
		case 'POST':
			$result = $crud_controller->parsePostMethod($params);
			break;
	}

    echo $result;
?>
