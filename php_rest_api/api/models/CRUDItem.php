<?php
    class CRUDItem
    {
        public $todo_id;
        public $title;
        public $description;
        public $due_date;
        public $is_done;

        public function save()
        {
            
        }

        public function toArray()
        {
            //return an array version of the todo item
            return array(
                'todo_id' => $this->todo_id,
                'title' => $this->title,
                'description' => $this->description,
                'due_date' => $this->due_date,
                'is_done' => $this->is_done
            );
        }

    }
?>
