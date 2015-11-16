<?php
    include_once 'model/Job.php';
    include_once 'model/Employee.php';

    class CRUDController
    {
        const kEMP_NAME = 'employee_name';
        const kMGR_NAME = 'manager_name';
        const kJOB = 'job';
    
        private static $instance;
    
        private function __construct() { }
        private function __clone() { }
        
        private function _isNullOrEmptyString($string)
        {
            return (!isset($string) || trim($string)==='');
        }

        private function _serializeCollection($collection)
        {
            $result = "";
            foreach ($collection as $value) {
                $result = $result . $value . "<br>";
            }

            return $result;
        }

        private function _checkInputValue($value, $customMessage=null)
        {
            if ($this->_isNullOrEmptyString($value)) {
                $errMessage = (!$this->_isNullOrEmptyString($customMessage))
                              ? $customMessage
                              : "Empty value provided for input parameter.";

                die($errMessage);
            }
        }

        public static function getInstance()
        {
            if (null === static::$instance) {
                static::$instance = new static();
            }
            
            return static::$instance;
        }

        public function readAction()
        {
            return $this->_serializeCollection(Job::getAll());
        }

        public function createAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];
            $mgr_name = $params[CRUDController::kMGR_NAME];
            $job_name = $params[CRUDController::kJOB];
            $this->_checkInputValue($emp_name);
            $this->_checkInputValue($job_name);

            $job = Job::getByCondition(Job::kNAME . "=" . $job_name);
            $this->_checkInputValue($job);

            // $manager = Employee::getByCondition(Employee::kMGR_NAME . "='" . $mgr_name . "'");
            $employee = new Employee('NULL', $emp_name, 'NULL', $job->id);
            $employee->save();

            return "POST OK";
        }
        
        public function updateAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];
            $mgr_name = $params[CRUDController::kMGR_NAME];
            $job = $params[CRUDController::kJOB];

            return "PUT" . $emp_name . $mgr_name . $job;
        }

        public function deleteAction($params)
        {
            $emp_name = $params[CRUDController::kEMP_NAME];

            $this->_checkInputValue($emp_name);

            return "DELETE" . $emp_name;
        }
    }
?>
