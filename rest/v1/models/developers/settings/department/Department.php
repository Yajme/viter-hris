<?php
namespace App\Models\Dev\Settings\Department;

class Department
{
    public $department_aid;
    public $department_is_active;
    public $department_name;
    public $department_description;
    public $department_created;
    public $department_updated;

    public $connection;
    public $lastInsertedId;

    public $start;
    public $total;
    public $search;

    public $tblSettingsDepartment;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsDepartment = "settings_department";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblSettingsDepartment} ";
            $sql .= " ( department_name ) ";
            $sql .= " VALUES (?);";

            $query = $this->connection->prepare($sql);
            $query->execute([
                $this->department_name,
            ]);
            $this->lastInsertedId = $this->connection->lastInsertId();
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        }

        return $query;
    }

    public function readAll()
    {
        try {
            $sql = "SELECT ";
            $sql .= "*";
            $sql .= " FROM {$this->tblSettingsDepartment}
                     WHERE true
            ";
            $sql .= $this->department_is_active != "" ? " AND department_is_active = :department_is_active " : " ";
            $sql .= $this->search != "" ? " AND department_name LIKE :department_name " : "";
            $query = $this->connection->prepare($sql);

            $query->execute([
            ...$this->department_is_active != "" ? ["department_is_active"=>$this->department_is_active] : [],
            ...$this->search != "" ? ["department_name"=>"%{$this->search}%"]  : []
            ]);
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        }

        return $query;
    }
    public function readLimit()
    {
        try {
            $sql = "SELECT ";
            $sql .= "*";
            $sql .= " FROM {$this->tblSettingsDepartment}
                     WHERE true
            ";
            $sql .= $this->department_is_active != "" ? " AND department_is_active = :department_is_active " : " ";
            $sql .= $this->search != "" ? " AND department_name LIKE :department_name " : "";
            $sql .= " LIMIT :start, :total";
            $query = $this->connection->prepare($sql);

            $query->execute([
            ...$this->department_is_active != "" ? ["department_is_active"=>$this->department_is_active] : [],
            ...$this->search != "" ? ["department_name"=>"%{$this->search}%"] : [],
            "start" => $this->start - 1,
            "total" => $this->total
            ]);
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        }

        return $query;
    }
    public function checkName()
    {
        try {
            $sql = "SELECT ";
            $sql .= "department_name";
            $sql .= " FROM {$this->tblSettingsDepartment} ";
            $sql .= " WHERE department_name = :department_name";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
            ]);
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        } catch (Exception $ex) {
            returnError($ex);
        }

        return $query;
    }

    public function update()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsDepartment} SET ";
            $sql .=
                "department_name = :department_name ";
            $sql .= "WHERE department_aid = :department_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_name" => $this->department_name,
                "department_aid" => $this->department_aid,
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

    public function delete()
    {
        try {
            $sql = "DELETE FROM {$this->tblSettingsDepartment} WHERE department_aid = :department_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "department_aid" => $this->department_aid,
            ]);
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        }

        return $query;
    }
    public function active()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsDepartment} SET ";
            $sql .=
                "department_is_active = :isActive ";
            $sql .= "WHERE department_aid = :department_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "isActive" => $this->department_is_active,
                "department_aid" => $this->department_aid,
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
