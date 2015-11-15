<?php

class DBConnection
{
	const kDB_IP = '127.0.0.1';
	const kPORT = '3306';
	const kUSER = 'root';
	const kPASSWORD = '';

	private static $instance;
	private $_connection;
	
    private function __construct() { }
	private function __clone() { }

	private function _connect()
	{
		$this->_connection = new mysqli(DBConnection::kDB_IP, DBConnection::kUSER, DBConnection::kPASSWORD);
		// Check connection
		if ($this->_connection->connect_error) {
			die("Connection failed: " . $this->_connection->connect_error);
		}
		echo "Connected successfully";
	}
	
	private function _disconnect()
	{
		$this->_connection->close();
	}
	
	public static function getInstance()
	{
		if (null === static::$instance) {
			static::$instance = new static();
		}
		
		return static::$instance;
	}
	
	public function select()
	{
		$this->_connect();
		$this->_disconnect();
	}
	
	public function insert()
	{
		$this->_connect();
		$this->_disconnect();
	}
	
	public function update()
	{
		$this->_connect();
		$this->_disconnect();
	}
	
	public function delete()
	{
		$this->_connect();
		$this->_disconnect();
	}
}

?>