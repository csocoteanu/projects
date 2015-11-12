<?php
	ini_set('display_errors', 'On');
	error_reporting(E_ALL); 

	function print_debug_info($arg)
	{
		echo '<pre>';
		var_dump($arg);
		echo '</pre>';	
	}

	include_once 'models/CRUDItem.php';
	include_once 'controllers/CRUDController.php';

	$params = $_REQUEST;
	$http_method = $_SERVER['REQUEST_METHOD'];
	$crud_controller = new CRUDController($params);

	#print_debug_info($params);
	#print_debug_info($_SERVER);

	switch ($http_method) {
		case 'GET':
			$result = $crud_controller->readAction();
			break;
		case 'POST':
			$result = $crud_controller->createAction();
			break;
		case 'PUT':
			$result = $crud_controller->updateAction();
			break;
		case 'DELETE':
			$result = $crud_controller->deleteAction();
			break;
	}

    echo $result;
?>
