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
            return "({$this->name}: {$this->getJob()->name} : {$this->getManager()})";
        }

		public function toArray() {
			return array(
				Employee::kID => $this->id,
				Employee::kNAME => $this->name,
				Employee::kJOB_ID => $this->getJob()->name,
				Employee::kMGR_ID => $this->getManager()->name
			);
		}
		
        public function getManager()
        {
            if ($this->_manager === null) {
                $this->_manager = Employee::getById($this->manager_id);
            }
            
            return $this->_manager;
        }
        
        public function getJob()
        {
            if ($this->_job === null) {
                $this->_job = Job::getById($this->job_id);
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
                    Employee::kNAME => "'".$this->name."'",
                    Employee::kJOB_ID => $this->job_id,
                    Employee::kMGR_ID => $this->manager_id
                )
            );
        }

        public function update()
        {
            $dbConnection = DBConnection::getInstance();
            $dbConnection->update(
                Employee::kEMPLOYEE_TABLE,
                Employee::kID . " = " . $this->id,
                array(
                    Employee::kNAME => "'".$this->name."'",
                    Employee::kJOB_ID => $this->job_id,
                    Employee::kMGR_ID => $this->manager_id
                )  
            );
        }

        public function delete()
        {
            $dbConnection = DBConnection::getInstance();
            $dbConnection->delete(Employee::kEMPLOYEE_TABLE, Employee::kID . " = " . $this->id);
        }

        public static function getAll()
        {
            $result = array();
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Employee::kEMPLOYEE_TABLE);

            foreach ($rows as $key => $value) {
                $employee = new Employee($value[Employee::kID], $value[Employee::kNAME], $value[Employee::kMGR_ID], $value[Employee::kJOB_ID]);
                array_push($result, $employee->toArray());
            }

            return $result;
        }
        
        public static function getById($id)
        {
            return Employee::_getByCondition(Employee::kID . "='" . $id . "'");
        }

        public static function getByName($name)
        {
            return Employee::_getByCondition(Employee::kNAME . "='" . $name . "'");
        }

        private static function _getByCondition($condition)
        {
            $result = null;
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Employee::kEMPLOYEE_TABLE, $condition);

            foreach ($rows as $key => $value) {
                $result = new Employee($value[Employee::kID], $value[Employee::kNAME], $value[Employee::kMGR_ID], $value[Employee::kJOB_ID]);
            }

            return $result;
        }
    }
?>
