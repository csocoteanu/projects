<?php
    class CRUDController
    {
        private $_params;

        function __construct($params)
        {
            $this->_params = $params;
        }

        public function createAction()
        {
            //create a new todo item
            $todo = new CRUDItem();
            $todo->title = $this->_params['title'];
            $todo->description = $this->_params['description'];
            $todo->due_date = $this->_params['due_date'];
            $todo->is_done = 'false';
             
            //pass the user's username and password to authenticate the user
            $todo->save();
             
            //return the todo item in array format
            return $todo->toArray();
        }

        public function readAction()
        {
        }

        public function updateAction()
        {
        }

        public function deleteAction()
        {
        }
    }
?>
