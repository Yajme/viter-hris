<?php
require_once './Interface.php';
namespace App\Models\Dev\Base
abstract class BaseModel implements IModels{
  
  protected $connection;
  protected $tableName;

  public $columnNames;
  public $filters;
  public $lastInsertedId;
  
  public function __construct($db) {
  $this->connection = $db;
  }
  private function validateColumnNames() {
     if (!is_array($this->columnNames) || array_is_list($this->columnNames) ||
  empty($this->columnNames)) {
       throw new InvalidArgumentException('columnNames must be a non-empty associative 
  array.');
     }
     return true;
  }
  public function create() {
    $this->validateColumnNames();
    $sql = "INSERT INTO {$this->tableName} (";
    if(is_array($this->columnNames)) { 
      $lastKey = array_key_last($this->columnNames);
      foreach($this->columnNames as $column => $value){
        $sql .= $column == $lastKey ? "{$column}" : "{$column},";
      } 
      $sql .= " ) VALUES (";
      foreach($this->columnNames as $column => $value) { 
      $sql .= $column == $lastKey ? ":{$column}" : ":{$column},";
      }
      $sql .= ");";
    }

    $query = $this->connection->prepare($sql);
    $params = $this->columnNames;
    $query->execute($params);
    $this->lastInsertedId = $this->connection->lastInsertId();
  }
  public function readAll() {

  }
  public function readLimit(){

  }
  public function checkName(){

  }
  public function update(){

  }
  public function delete() {

  }
  public function active() {

  }
}
