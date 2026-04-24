<?php
use App\Models\Dev\Settings\Department\Department;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Department($conn);
    $val->department_aid = $data["department_aid"];
    $val->department_name = $data["department_name"];

    //Data validation
    checkId($val->department_aid);
    compareName($val, $data["department_name_old"], $val->department_name);
    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Department Update", $query);
}

checkEndpoint();
