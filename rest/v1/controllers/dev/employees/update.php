<?php
use App\Models\Dev\Employees\Employees;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Employees($conn);
    $val->employee_aid = $_GET['id'];
    $val->employee_first_name = trim($data["employee_first_name"]);
    $val->employee_middle_name = trim($data["employee_middle_name"]);
    $val->employee_last_name = trim($data["employee_last_name"]);
    $val->employee_email = $data["employee_email"];
    $val->employee_department_id = $data["employee_department_id"];

    //Data validation
    checkId($val->employee_aid);
    compareName($val, $data["employee_name_old"], $val->employee_first_name);
    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Employees Update", $query);
}

checkEndpoint();
