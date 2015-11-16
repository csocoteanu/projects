<?php

class DBConnection
{
    const kDB_IP = '127.0.0.1';
    const kPORT = '3306';
    const kUSER = 'root';
    const kPASSWORD = 'root';
    const kDB_NAME = 'mydb';

    private static $instance;
    private $_connection;
    
    private function __construct() { }
    private function __clone() { }

    private function _connect()
    {
        $this->_connection = new mysqli(DBConnection::kDB_IP, DBConnection::kUSER, DBConnection::kPASSWORD, DBConnection::kDB_NAME);
        // Check connection
        if ($this->_connection->connect_error) {
            die("Connection failed: " . $this->_connection->connect_error);
        }

        print_debug_info("Connected successfully");
    }
    
    private function _disconnect()
    {
        $this->_connection->close();
    }
    

    private function _executeQuery($query)
    {
        $sqlResult = null;

        $this->_connect();
        $sqlResult = $this->_connection->query($query);
        if (!$sqlResult) {
            die ("Failed executing query: '" . $query . "' (" . $this->_connection->errno . ": " . $this->_connection->error . ")");
        }
        $this->_disconnect();

        return $sqlResult;
    }

    public static function getInstance()
    {
        if (null === static::$instance) {
            static::$instance = new static();
        }
        
        return static::$instance;
    }
    
    public function select($table_name, $condition=null)
    {
        // build SQL query string
        $sql = "SELECT * FROM " . $table_name;
        if (isset($condition))
            $sql = $sql . " WHERE (" . $condition . ")";

        $sqlResult = $this->_executeQuery($sql);
        while ($row = $sqlResult->fetch_assoc()) {
            yield $row;
        }
    }
    
    public function insert($table_name, $fields_values)
    {
        $fields = array();
        $values = array();
        foreach ($fields_values as $field => $value) {
            array_push($fields, $field);
            array_push($values, $value);
        }

        $sql = "INSERT INTO " . $table_name . " (" . join(',', $fields) . ") VALUES (" . join(',', $values) . ")";
        return $this->_executeQuery($sql);
    }
    
    public function update($table_name, $condition, $fields_values)
    {
        $setValues = array();
        foreach ($fields_values as $field => $value) {
            array_push($setValues, $field . "=" . $value);
        }

        $sql = "UPDATE " . $table_name . " SET " . join(',', $setValues) . " WHERE (" . $condition . ")";
        return $this->_executeQuery($sql);
    }
    
    public function delete()
    {
    }
}

?>