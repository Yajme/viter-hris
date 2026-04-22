<?php
namespace App\Models\Dev\Memo;

class Memo
{
    public $memo_aid;
    public $memo_is_active;
    public $memo_from;
    public $memo_to;
    public $memo_date;
    public $memo_category;
    public $memo_text;
    public $memo_created;
    public $memo_updated;

    public $start;
    public $total;
    public $search;

    protected $connection;
    public $lastInsertedId;

    protected $tblMemo;

    public function __construct($db)
    {
        $this->connection = $db;
        $this->tblMemo = "memo";
    }

    public function create()
    {
        try {
            $sql = "INSERT INTO {$this->tblMemo} ";
            $sql .=
                " (
                    memo_from,
                    memo_to,
                    memo_date,
                    memo_category,
                    memo_text
                )

                ";
            $sql .=
                " VALUES (
                    :memo_from,
                    :memo_to,
                    :memo_date,
                    :memo_category,
                    :memo_text
                );";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_from" => $this->memo_from,
                "memo_to" => $this->memo_to,
                "memo_date" => $this->memo_date,
                "memo_category" => $this->memo_category,
                "memo_text" => $this->memo_text,
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

    public function readAll(){
            try{
                $sql = "select ";
                $sql .= " * ";
                $sql .= " from {$this->tblMemo} ";
                $sql .= " where true ";
                $sql .= $this->memo_is_active
                    ? " and memo_is_active = :memo_is_active "
                    : " ";
                    if ($this->search !== "") {
                        $sql .= " AND (
                        memo_from LIKE :memo_from
                       OR memo_to LIKE :memo_to
                       OR memo_category LIKE :memo_category
                       OR memo_text LIKE :memo_text
                        )";
                    }
                $query = $this->connection->prepare($sql);
                $query->execute([
                    ...$this->memo_is_active ? ["memo_is_active" => $this->memo_is_active] : [],
                    ...$this->search ? [
                    "memo_from" => "%$this->search%",
                    "memo_to" => "%$this->search%",
                    "memo_category" => "%$this->search%",
                    "memo_text" => "%$this->search%",
                        ] : [],
                ]);
            }catch(PDOException $e){
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
            $sql = "SELECT * FROM {$this->tblMemo} WHERE TRUE ";
            $sql .= $this->memo_is_active != "" ? " AND memo_is_active = :memo_is_active" : "";
            if ($this->search !== "") {
                $sql .= " AND (
                memo_from LIKE :memo_from
               OR memo_to LIKE :memo_to
               OR memo_category LIKE :memo_category
               OR memo_text LIKE :memo_text
                )";
            }
            $sql .= " LIMIT :start, :total ";
            $query = $this->connection->prepare($sql);
            $params = [];
            $params += $this->memo_is_active != "" ? ["memo_is_active" => $this->memo_is_active] : [];
            $params += ["start"=>$this->start - 1, "total"=> $this->total];
            if ($this->search !== "") {
                $params += [
                "memo_from" => "%$this->search%",
                "memo_to" => "%$this->search%",
                "memo_category" => "%$this->search%",
                "memo_text" => "%$this->search%",
                ];
            }

            $query->execute($params);

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
                "CONCAT(memo_first_name,' ',memo_middle_name,' ',memo_last_name) as memo_name";
            $sql .= " FROM {$this->tblMemo} ";
            $sql .= " WHERE memo_first_name = :memo_first_name";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_first_name" => $this->memo_first_name,
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
            $sql = "UPDATE {$this->tblMemo} SET ";
            $sql .= "
            memo_from = :memo_from,
            memo_to = :memo_to,
            memo_date =  :memo_date,
            memo_category = :memo_category,
            memo_text = :memo_text
            ";
            $sql .= "WHERE memo_aid = :memo_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
            "memo_from" => $this->memo_from,
            "memo_to" => $this->memo_to,
            "memo_date" => $this->memo_date,
            "memo_category" => $this->memo_category,
            "memo_text" => $this->memo_text,
                "memo_aid" => $this->memo_aid,
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
            $sql = "DELETE FROM {$this->tblMemo} WHERE memo_aid = :memo_aid";
            $query = $this->connection->prepare($sql);
            $query->execute([
                "memo_aid" => $this->memo_aid,
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
            $sql = "UPDATE {$this->tblMemo} SET ";
            $sql .=
                "memo_is_active = :isActive, memo_updated = CURRENT_TIMESTAMP ";
            $sql .= "WHERE memo_aid = :memo_aid";

            $query = $this->connection->prepare($sql);
            $query->execute([
                "isActive" => $this->memo_is_active,
                "memo_aid" => $this->memo_aid,
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
