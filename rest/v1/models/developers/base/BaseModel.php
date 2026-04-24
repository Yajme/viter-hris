<?php
namespace App\Models\Dev\Base;

use InvalidArgumentException;
use PDOException;

abstract class BaseModel implements IModels{

  protected $connection;
  protected $tableName;

  public $columnNames;
  public $filters;
  public $lastInsertedId;
  public $id;

  public function __construct($db) {
  $this->connection = $db;
  $this->filters = array(
  "search" => "",
  "total" => 0,
  "start" => 0
  );
  }
  private function validateColumnNames() {
     if (!is_array($this->columnNames) || array_is_list($this->columnNames) ||
  empty($this->columnNames)) {
       throw new InvalidArgumentException('columnNames must be a non-empty associative
  array.');
     }
     return true;
  }
  private function filterArray($keyword) {
      $activeKeys = array_filter(
          $this->columnNames,
          fn($key) => str_contains($key, $keyword),
          ARRAY_FILTER_USE_KEY
      );

      return $activeKeys;
  }
  public function getId(){
      return $this->id["value"];
  }
  public function setId($value) {
      $this->id["value"] = $value;
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
    return $query;
  }
  public function readAll() {
      throw new Exception("Method Not Implemented");
  }
  public function readLimit(){
       throw new Exception("Method Not Implemented");
  }
  public function checkName(){
       throw new Exception("Method Not Implemented");
  }
  public function update(){
      try{
          $this->validateColumnNames();
          $sql = "UPDATE {$this->tableName} SET ";
           $lastKey = array_key_last($this->columnNames);
           foreach($this->columnNames as $column => $value) {
              $sql .= $column === $lastKey ? " {$column} = :{$column} " : " {$column} = :{$column}, ";
           }
           $sql .= "   WHERE {$this->id['columnName']} = :{$this->id['columnName']}";
           $query = $this->connection->prepare($sql);
           $query->execute([...$this->columnNames, $this->id["columnName"] => $this->id["value"]]);
      }catch(PDOException $ex){
          returnError($ex);
          $query = [
              "error" => true,
              "error_info" => $ex->getMessage(),
          ];
      }

      return $query;
  }
  public function delete() {
      try {
          $sql = "DELETE FROM {$this->tableName} WHERE {$this->id['columnName']} = :{$this->id['columnName']}";
          $query = $this->connection->prepare($sql);
          $query->execute([
              $this->id['columnName'] => $this->id['value'],
          ]);
      } catch (PDOException $ex) {
          $query = [
              "error" => true,
              "error_info" => $ex->getMessage(),
          ];
      }

      return $query;
  }
  public function active() {
      try {
          $isActiveColumn = $this->filterArray("_is_active");
          $activeKey = array_key_first($isActiveColumn);
          $sql = "UPDATE {$this->tableName} SET {$activeKey} = :isActive  WHERE {$this->id['columnName']} = :id";

          $query = $this->connection->prepare($sql);
          $query->execute([
              "isActive" => $isActiveColumn[$activeKey],
              "id" => $this->id['value'],
          ]);
      } catch (PDOException $ex) {
          returnError($ex);
          $query = [
              "error" => true,
              "error_info" => $ex->getMessage(),
          ];
      }

      return $query;
  }
}
