<?php

class Roles
{
    public $role_aid;
    public $role_is_active;
    public $role_name;
    public $role_description;
    public $role_created;
    public $role_updated;

    public $connection;
    public $lastInsertedId;

    public $tblSettingsRoles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsRoles = "settings_roles";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblSettingsRoles} ";
            $sql .= "(role_is_active, role_name, role_description)";
            $sql .= " VALUES (?,?,?);";

            $query = $this->connection->prepare($sql);
            $query->execute([
                $this->role_is_active ?? 1,
                $this->role_name,
                $this->role_description,
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
            $sql .= " FROM {$this->tblSettingsRoles}";
            $query = $this->connection->query($sql);
        } catch (PDOException $ex) {
            $query = [
                "error" => true,
                "error_info" => $ex->getMessage(),
            ];
        }

        return $query;
    }

    public function update()
    {
        try {
            $sql = "UPDATE {$this->tblSettingsRoles} SET ";
            $sql .=
                "role_name = :role_name, role_description = :role_description, role_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE role_aid = :role_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "role_name" => $this->role_name,
                "role_description" => $this->role_description,
                "role_aid" => $this->role_aid,
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
