<?php
	include_once 'model/Job.php';
	include_once 'model/Employee.php';

    class CRUDController
    {
		const kHTTP_ACTION = 'http_action';
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

        public function readAction($params)
        {
            return "GET" . var_dump($params);
        }

		public function parsePostMethod($params)
		{
			$result = null;
			$http_action = $params[CRUDController::kHTTP_ACTION];
			$emp_name = $params[CRUDController::kEMP_NAME];
			$mgr_name = $params[CRUDController::kMGR_NAME];
			$job = $params[CRUDController::kJOB];
			
			switch ($http_action) {
				case "POST":
					$result = $this->_createAction($emp_name, $mgr_name, $job);
					break;
				case "PUT":
					$result = $this->_updateAction($emp_name, $mgr_name, $job);
					break;
				case "DELETE":
					$result = $this->_deleteAction($emp_name);
					break;
				default:
					die("Invalid action provided for controller: " . $http_action);
			}
			
			return $result;
		}
		
		private function _createAction($emp_name, $mgr_name, $job)
        {
			return "POST";
        }
		
        private function _updateAction($emp_name, $mgr_name, $job)
        {
            return "PUT";
        }

        private function _deleteAction($params)
        {
            return "DELETE";
        }
    }
?>
