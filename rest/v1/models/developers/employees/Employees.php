<?php

class Employees
{
    public $employee_aid;
    public $employee_is_active;
    public $employee_first_name;
    public $employee_middle_name;
    public $employee_last_name;
    public $employee_email;
    public $employee_full_name;
    public $employee_created;
    public $employee_updated;

    public $start;
    public $total;
    public $search;

    public $connection;
    public $lastInsertedId;

    public $tblEmployees;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblEmployees = "employees";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblEmployees} ";
            $sql .=
                "(employee_is_active, employee_first_name,employee_middle_name,employee_last_name, employee_email)";
            $sql .=
                " VALUES (:employee_is_active,:employee_first_name, :employee_middle_name,:employee_last_name,:employee_email);";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_is_active" => $this->employee_is_active ?? 1,
                "employee_name" => $this->employee_name,
                "employee_email" => $this->employee_email,
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
            $sql .= " FROM {$this->tblEmployees}";
            $sql .= " WHERE employee_is_active = :employee_is_active";
            $sql .= $this->search != "" ? " AND (" : "";
            $sql .= $this->search != "" ? " employee_first_name LIKE :employee_first_name" : "";
            $sql .= $this->search != "" ? " OR employee_middle_name LIKE :employee_middle_name" : "";
            $sql .= $this->search != "" ? " OR employee_last_name LIKE :employee_last_name" : "";
            $sql .= $this->search != "" ? " OR  employee_email LIKE :employee_email" : "";
            $sql .= $this->search != "" ? ")" : "";
            $query = $this->connection->prepare($sql);

            $query->execute([
            ...$this->employee_is_active ? ["employee_is_active"=> $this->employee_is_active] : [],
            ...$this->search ? [
            "employee_first_name" => "%{$this->search}%",
            "employee_middle_name" => "%{$this->search}%",
            "employee_last_name" => "%{$this->search}%",
            "employee_email" => "%{$this->search}%",
            ] : []
            ])
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
            $sql .=
                "CONCAT(employee_first_name,' ',employee_middle_name,' ',employee_last_name) as employee_name";
            $sql .= " FROM {$this->tblEmployees} ";
            $sql .= " WHERE employee_name = :employee_name";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_name" => $this->employee_name,
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
            $sql = "UPDATE {$this->tblEmployees} SET ";
            $sql .=
                "employee_name = :employee_name, employee_email = :employee_email, employee_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE employee_aid = :employee_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_name" => $this->employee_name,
                "employee_email" => $this->employee_email,
                "employee_aid" => $this->employee_aid,
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
            $sql = "DELETE FROM {$this->tblEmployees} WHERE employee_aid = :employee_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "employee_aid" => $this->employee_aid,
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
            $sql = "UPDATE {$this->tblEmployees} SET ";
            $sql .=
                "employee_is_active = :isActive, employee_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE employee_aid = :employee_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "isActive" => $this->employee_is_active,
                "employee_aid" => $this->employee_aid,
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
