<?php
    include_once 'model/DBConnection.php';
    include_once 'model/Job.php';

    class Employee
    {
        const kEMPLOYEE_TABLE = 'employees';
        const kID = 'id';
        const kNAME = 'name';
        const kJOB_ID = 'jobs_id';
        const kMGR_ID = 'employees_id';

        private $_manager;
        private $_job;
    
        public $id;
        public $name;
        public $manager_id;
        public $job_id;

        public function __construct($id, $name, $manager_id, $job_id)
        {
            $this->id = $id;
            $this->name = $name;
            $this->manager_id = $manager_id;
            $this->job_id = $job_id;
        }
        
        public function __toString() {
            return "({$this->name}: {$this->getJob()->name})";
        }

        public function getManager()
        {
            if ($this->_manager === null) {
                $this->_manager = Employee::getByCondition(Employee::kID . " = '" . $this->manager_id . "'");
            }
            
            return $this->_manager;
        }
        
        public function getJob()
        {
            if ($this->_job === null) {
                $this->_job = Job::getByCondition(Job::kID . " = '" . $this->job_id . "'");
            }
            
            return $this->_job;
        }
        
        public function save()
        {
            $dbConnection = DBConnection::getInstance();
            $dbConnection->insert(
                Employee::kEMPLOYEE_TABLE,
                array(
                    Employee::kID => $this->id,
                    Employee::kNAME => $this->name,
                    Employee::kJOB_ID => $this->job_id,
                    Employee::kMGR_ID => $this->manager_id
                )
            );
        }

        public function update()
        {
            $dbConnection = DBConnection::getInstance();
            $dbConnection->insert(
                Employee::kEMPLOYEE_TABLE,
                Employee::kID . " = '" . $this->id . "'",
                array(
                    kNAME => $this->name,
                    kJOB_ID => $this->job_id,
                    kMGR_ID => $this->manager_id
                )  
            );
        }

        public static function getAll()
        {
            $result = array();
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Employee::kEMPLOYEE_TABLE);

            foreach ($rows as $key => $value) {
                $employee = new Employee($value[Employee::kID], $value[Employee::kNAME], $value[kJOB_ID], $value[kMGR_ID]);
                array_push($result, $employee);
            }

            return $result;
        }
        
        public static function getByCondition($condition)
        {
            $result = null;
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Employee::kEMPLOYEE_TABLE, $condition);

            foreach ($rows as $key => $value) {
                $result = new Employee($value[Employee::kID], $value[Employee::kNAME], $value[kJOB_ID], $value[kMGR_ID]);
            }

            return $result;
        }
    }
?>
