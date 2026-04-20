<?php
// namespace V1\Models\Developers\Settings\userss;

class Users
{
    public $users_aid;
    public $users_is_active;
    public $users_first_name;
    public $users_last_name;
    public $users_email;
    public $users_password;
    public $users_role_id;
    public $users_created;
    public $users_updated;

    private $connection;
    public $lastInsertedId;

    public $start;
    public $total;
    public $search;


    protected $tblSettingsUsers;
    protected $tblSettingsRoles;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblSettingsUsers = "settings_users";
        $this->tblSettingsRoles = "settings_roles";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblSettingsUsers} ";
            $sql .= "  (users_is_active, users_first_name, users_last_name, users_email, users_password, users_role_id) ";
            $sql .= " VALUES ( :users_is_active, :users_first_name, :users_last_name, :users_email, :users_password, :users_role_id); ";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_is_active"=>$this->users_is_active ?? 1,
                "users_first_name"=>$this->users_first_name,
                "users_last_name" =>$this->users_last_name,
                "users_email"=>$this->users_email,
                "users_password"=>$this->users_password,
                "users_role_id"=>$this->users_role_id,
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
            $sql .= " FROM {$this->tblSettingsUsers} as users ";
            $sql .= " ,{$this->tblSettingsRoles} as roles ";
            $sql .= " WHERE users.users_role_id = roles.role_aid ";
            $sql .= $this->users_is_active != "" ? " AND users.users_is_active = :users_is_active " : " " ;
            if($this->search != "") {
                $sql .= " AND (";
                $sql .= " users_first_name LIKE :users_first_name ";
                $sql .=  " OR users_last_name LIKE :users_last_name ";
                $sql .=  " OR CONCAT(users_last_name,' ', users_first_name) LIKE :users_fullname_last_first ";
                $sql .=  " OR CONCAT(users_first_name,' ', users_last_name) LIKE :users_fullname_first_last ";
                $sql .=  " OR users_email LIKE :users_email ";
                $sql .= ") ";
            }

            $query = $this->connection->prepare($sql);
            $params = [];
            $params += $this->users_is_active != "" ? ["users_is_active" => $this->users_is_active] : [];
            $params += $this->search != "" ? [
           "users_first_name" => "%{$this->search}%",
            "users_last_name" => "%{$this->search}%",
            "users_fullname_last_first" => "%{$this->search}%",
            "users_fullname_first_last" => "%{$this->search}%",
            "users_email" => "%{$this->search}%"
            ] : [];
            $query->execute([
            ...$params
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
            $sql .= " FROM {$this->tblSettingsUsers} as users ";
            $sql .= " ,{$this->tblSettingsRoles} as roles ";
            $sql .= " WHERE users.users_role_id = roles.role_aid ";
            $sql .= $this->users_is_active != "" ? " AND users.users_is_active = :users_is_active " : " " ;
            if($this->search != "") {
                $sql .= " AND (";
                $sql .= " users_first_name LIKE :users_first_name ";
                $sql .=  " OR users_last_name LIKE :users_last_name ";
                $sql .=  " OR CONCAT(users_last_name,' ', users_first_name) LIKE :users_fullname_last_first ";
                $sql .=  " OR CONCAT(users_first_name,' ', users_last_name) LIKE :users_fullname_first_last ";
                $sql .=  " OR users_email LIKE :users_email ";
                $sql .= ") ";
            }
             $sql .= " LIMIT :start, :total ";

            $query = $this->connection->prepare($sql);
            $params = [];
            $params += $this->users_is_active != "" ? ["users_is_active" => $this->users_is_active] : [];
            $params += $this->search != "" ? [
            "users_first_name" => "%{$this->search}%",
            "users_last_name" => "%{$this->search}%",
            "users_fullname_last_first" => "%{$this->search}%",
            "users_fullname_first_last" => "%{$this->search}%",
            "users_email" => "%{$this->search}%"
            ] : [];

            $query->execute([
            ...$params,
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
            $sql .= "users_first_name";
            $sql .= " FROM {$this->tblSettingsUsers} ";
            $sql .= " WHERE users_first_name = :users_first_name";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
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
            $sql = "UPDATE {$this->tblSettingsUsers} SET ";
            $sql .=
                "users_first_name = :users_first_name, users_email = :users_email, users_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE users_aid = :users_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_first_name" => $this->users_first_name,
                "users_email" => $this->users_email,
                "users_aid" => $this->users_aid,
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
            $sql = "DELETE FROM {$this->tblSettingsUsers} WHERE users_aid = :users_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "users_aid" => $this->users_aid,
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
            $sql = "UPDATE {$this->tblSettingsUsers} SET ";
            $sql .=
                "users_is_active = :isActive, users_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE users_aid = :users_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "isActive" => $this->users_is_active,
                "users_aid" => $this->users_aid,
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
