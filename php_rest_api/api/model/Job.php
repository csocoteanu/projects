<?php
    include_once 'model/DBConnection.php';

    class Job
    {
        const kJOB_TABLE = 'jobs';
        const kID = 'id';
        const kNAME = 'name';

        public $id;
        public $name;

        public function __construct($id, $name)
        {
            $this->id = $id;
            $this->name = $name;
        }
        
        public function __toString() {
            return "({$this->id}: {$this->name})";
        }
       
        public static function getAll()
        {
            $result = array();
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Job::kJOB_TABLE);

            foreach ($rows as $key => $value) {
                $employee = new Job($value[Job::kID], $value[Job::kNAME]);
                array_push($result, $employee);
            }

            return $result;
        }
        
        public static function getByCondition($condition)
        {
            $result = null;
            $dbConnection = DBConnection::getInstance();
            $rows = $dbConnection->select(Job::kJOB_TABLE, $condition);

            foreach ($rows as $key => $value) {
                $result = new Job($value[Job::kID], $value[Job::kNAME]);
            }

            return $result;
        }
    }
?>
