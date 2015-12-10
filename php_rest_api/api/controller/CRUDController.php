<?php
    include_once 'model/ProxyLayer.php';

    class CRUDController
    {
        const kEMP_NAME = 'employee_name';
        const kMGR_NAME = 'manager_name';
        const kJOB = 'job';
    
        private static $instance;
    
        private function __construct() { }
        private function __clone() { }

        public static function getInstance()
        {
            if (null === static::$instance) {
                static::$instance = new static();
            }
            
            return static::$instance;
        }

        public function readAction()
        {
            $proxy = ProxyLayer::getInstance();
            return $proxy->getAllEmployees_JSON();
        }

        public function createAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];
            $mgr_name = $params[CRUDController::kMGR_NAME];
            $job_name = $params[CRUDController::kJOB];
            $proxy = ProxyLayer::getInstance();
            
            $proxy->createEmployee($emp_name, $job_name, $mgr_name);

            return "POST OK.";
        }
        
        public function updateAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];
            $mgr_name = $params[CRUDController::kMGR_NAME];
            $job_name = $params[CRUDController::kJOB];
            $proxy = ProxyLayer::getInstance();

            $proxy->updateEmployee($emp_name, $job_name, $mgr_name);

            return "PUT OK.";
        }

        public function deleteAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];
            $proxy = ProxyLayer::getInstance();

            $proxy->deleteEmployee($emp_name);

            return "DELETE OK.";
        }
    }
?>
