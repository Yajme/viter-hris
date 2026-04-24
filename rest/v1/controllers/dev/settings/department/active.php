<?php
use App\Models\Dev\Settings\Department\Department;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    checkPayload($data);
    $val = new Department($conn);
    $val->department_aid = $_GET["id"];
    $val->department_is_active = $data["isActive"];
    checkId($val->department_aid);
    $query = checkActive($val);
    http_response_code(200); // OK
    returnSuccess($val, "Department Archive", $query);
}

checkEndpoint();
