<?php
    const kDEBUG = false;

    ini_set('display_errors', 'On');
    error_reporting(E_ALL); 

    function print_debug_info($arg)
    {
        if (kDEBUG) {
            echo '<pre>';
            var_dump($arg);
            echo '</pre>';  
        }
    }

    function get_data_from_body()
    {
        $queryString = file_get_contents('php://input');
        $data = array();
        parse_str($queryString, $data);

        return $data;
    }

    include_once 'controller/CRUDController.php';

    $result = null;
    $crud_controller = null;
    $http_method = $_SERVER['REQUEST_METHOD'];
    $http_body = get_data_from_body();

    print_debug_info($http_method);
    print_debug_info($http_body);
    print_debug_info($_SERVER);
    
    try {
        $crud_controller = CRUDController::getInstance();
        switch ($http_method) {
            case 'GET':
                $result = $crud_controller->readAction();
                break;
            case 'POST':
                $result = $crud_controller->createAction($http_body);
                break;
            case 'PUT':
                $result = $crud_controller->updateAction($http_body);
                break;
            case 'DELETE':
                $result = $crud_controller->deleteAction($http_body);
                break;
        }
    } catch (Exception $e) {
        die("Fatal error: " . $e->getMessage() . "<br>" .  $e->getTraceAsString());
    }

    echo $result;
?>
