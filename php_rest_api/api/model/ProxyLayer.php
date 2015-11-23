<?php
    include_once 'model/Job.php';
    include_once 'model/Employee.php';

    class ProxyLayer
    {
        const kINVALID_NAME = 'Invalid name provided: %s';

        private static $instance;
    
        private function __construct() { }
        private function __clone() { }

        private function _isNullOrEmptyString($string)
        {
            return empty($string);
        }

        private function _checkInputValue($value, $customMessage=null)
        {
            if (empty($value)) {
                $errMessage = $customMessage;
                if (empty($errMessage))
                    $errMessage = "Empty value provided for input parameter.";

                $e = new Exception();
                die($errMessage . " <b>Stack trace</b>:<br>" . $e->getTraceAsString());
            }
        }

        private function _getManagerId($manager_name)
        {
            if (empty($manager_name)) {
                return 'NULL';
            } else {
                $manager = Employee::getByName($manager_name);
                $this->_checkInputValue($manager, sprintf(ProxyLayer::kINVALID_NAME . " for manager.", $manager_name));
                $manager_id = $manager->id;
                return $manager_id;
            }
        }

        private function _getJobId($job_name)
        {
            $job = Job::getByName($job_name);
            $this->_checkInputValue($job, sprintf(ProxyLayer::kINVALID_NAME . " for job.", $job_name));
            return $job->id;
        }

        public static function getInstance()
        {
            if (null === static::$instance) {
                static::$instance = new static();
            }
            
            return static::$instance;
        }

        public function getAllEmployees_JSON()
        {
            return json_encode(Employee::getAll());
        }

        public function createEmployee($name, $job_name, $manager_name)
        {
            // check for correct input values
            $this->_checkInputValue($name);
            $this->_checkInputValue($job_name);

            // get the job_id
            $job_id = $this->_getJobId($job_name);
            // get the manager_id, if possible
            $manager_id = $this->_getManagerId($manager_name);

            $employee = new Employee('NULL', $name, $manager_id, $job_id);
            $employee->save();
        }

        public function updateEmployee($name, $job_name, $manager_name)
        {
            // check for correct input values
            $this->_checkInputValue($name);
            $this->_checkInputValue($job_name);

            // get the employee
            $employee = Employee::getByName($name);
            $this->_checkInputValue($employee, sprintf(ProxyLayer::kINVALID_NAME, $name));
            // get the job_id
            $employee->job_id = $this->_getJobId($job_name);
            // get the manager_id, if possible
            $employee->manager_id = $this->_getManagerId($manager_name);

            $employee->update();
        }

        public function deleteEmployee($name)
        {
            $this->_checkInputValue($name);
            $employee = Employee::getByName($name);
            $this->_checkInputValue($employee, sprintf(ProxyLayer::kINVALID_NAME, $name));

            $employee->delete();
        }

    }
?>
