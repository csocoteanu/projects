<?php
	include_once 'model/DBConnection.php';
	include_once 'model/Job.php';

    class Employee
    {
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
		
        public function toArray()
        {
            //return an array version of the todo item
            return array(
                'id' => $this->id,
				'name' => $this->name,
				'manager_id' => $this->manager_id,
				'job_id' => $this->job_id
            );
        }

		public function getManager()
		{
			if ($this->_manager === null) {
			}
			
			return $this->_manager;
		}
		
		public function getJob()
		{
			if ($this->_job === null) {
			}
			
			return $this->_job;
		}
		
		public static function getAll()
		{
		}
		
		public static function getById()
		{
		}
    }
?>
