<?php
use App\Models\Dev\Settings\Notifications\Notifications;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$val = new Notifications($conn);
$val->columnNames["notification_first_name"] = $data["notification_first_name"];
$val->columnNames["notification_last_name"] = $data["notification_last_name"];
$val->columnNames["notification_purpose"] = $data["notification_purpose"];
$val->columnNames["notification_email"] = $data["notification_email"];

// isNameExist($val, $val->department_name);
$query = checkCreate($val);
http_response_code(201); // CREATED
returnSuccess($val, "Notifications Create", $query);
