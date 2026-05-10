<?php
use App\Models\Dev\Settings\Notifications\Notifications;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Notifications($conn);
    $val->columnNames["notification_first_name"] = $data["notification_first_name"];
    $val->columnNames["notification_last_name"] = $data["notification_last_name"];
    $val->columnNames["notification_purpose"] = $data["notification_purpose"];
    $val->columnNames["notification_email"] = $data["notification_email"];
    $val->id["value"] = $_GET["id"];

    //Data validation
    checkId($val->id["value"]);
    // compareName($val, $data["department_name_old"], $val->department_name);
    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Notifications Update", $query);
}

checkEndpoint();
