<?php
	include_once 'model/DBConnection.php';

    class Job
    {
        public $id;
        public $name;

		public function __construct($id, $name)
		{
			$this->id = $id;
			$this->name = $name;
		}
		
        public function toArray()
        {
            //return an array version of the todo item
            return array(
                'id' => $this->id,
                'name' => $this->name
            );
        }

		public static function getAll()
		{
		}
		
		public static function getById()
		{
		}
    }
?>
