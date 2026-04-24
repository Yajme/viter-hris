<?php
namespace App\Models\Dev\Settings\Notifications;

use App\Models\Dev\Base\BaseModel;
use PDO;
use PDOException;

class Notifications extends BaseModel{


  public function __construct($db) {
    parent::__construct($db);
    $this->tableName = "settings_notifications";
    $this->id = array(
    "columnName" => "notification_aid",
    "value" => 0
    );
  }
  public function readAll(){
      try {
          $notificationIsActive = $this->columnNames["notification_is_active"] ?? "";
          $search = $this->filters["search"] ?? "";

          $sql = "SELECT * FROM {$this->tableName} as notification WHERE TRUE ";
          $sql .= $notificationIsActive !== "" ? " AND notification.notification_is_active = :notification_is_active " : "";
          if ($search !== "") {
              $sql .= " AND (";
              $sql .= " notification_first_name LIKE :notification_first_name ";
              $sql .= " OR notification_last_name LIKE :notification_last_name ";
              $sql .= " OR CONCAT(notification_last_name,' ', notification_first_name) LIKE :notification_fullname_last_first ";
              $sql .= " OR CONCAT(notification_first_name,' ', notification_last_name) LIKE :notification_fullname_first_last ";
              $sql .= " OR notification_email LIKE :notification_email ";
              $sql .= ") ";
          }

          $query = $this->connection->prepare($sql);
          $params = [];
          $params += $notificationIsActive !== "" ? ["notification_is_active" => $notificationIsActive] : [];
          $params += $search !== "" ? [
          "notification_first_name" => "%{$search}%",
          "notification_last_name" => "%{$search}%",
          "notification_fullname_last_first" => "%{$search}%",
          "notification_fullname_first_last" => "%{$search}%",
          "notification_email" => "%{$search}%"
          ] : [];
          $query->execute($params);
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
          $notificationIsActive = $this->columnNames["notification_is_active"] ?? "";
          $search = $this->filters["search"] ?? "";
          $start = (int) ($this->filters["start"] ?? 1);
          $total = (int) ($this->filters["total"] ?? 10);

          $sql = "SELECT * FROM {$this->tableName} as notification WHERE TRUE ";
          $sql .= $notificationIsActive !== "" ? " AND notification.notification_is_active = :notification_is_active " : "";
          if ($search !== "") {
              $sql .= " AND (";
              $sql .= " notification_first_name LIKE :notification_first_name ";
              $sql .= " OR notification_last_name LIKE :notification_last_name ";
              $sql .= " OR CONCAT(notification_last_name,' ', notification_first_name) LIKE :notification_fullname_last_first ";
              $sql .= " OR CONCAT(notification_first_name,' ', notification_last_name) LIKE :notification_fullname_first_last ";
              $sql .= " OR notification_email LIKE :notification_email ";
              $sql .= ") ";
          }
          $sql .= " LIMIT :start, :total ";

          $query = $this->connection->prepare($sql);
          $params = [];
          $params += $notificationIsActive !== "" ? ["notification_is_active" => $notificationIsActive] : [];
          $params += $search !== "" ? [
          "notification_first_name" => "%{$search}%",
          "notification_last_name" => "%{$search}%",
          "notification_fullname_last_first" => "%{$search}%",
          "notification_fullname_first_last" => "%{$search}%",
          "notification_email" => "%{$search}%"
          ] : [];
          foreach ($params as $key => $value) {
              $query->bindValue(":{$key}", $value);
          }
          $query->bindValue(":start", max(0, $start - 1), PDO::PARAM_INT);
          $query->bindValue(":total", max(1, $total), PDO::PARAM_INT);
          $query->execute();
      } catch (PDOException $ex) {
          $query = [
              "error" => true,
              "error_info" => $ex->getMessage(),
          ];
      }

      return $query;
  }
}
