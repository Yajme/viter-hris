<?php
use App\Models\Dev\Employees\Employees;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    checkPayload($data);
    $val = new Employees($conn);
    $val->employee_aid = $_GET["id"];
    $val->employee_is_active = $data["isActive"];
    checkId($val->employee_aid);
    $query = checkActive($val);
    http_response_code(200); // OK
    returnSuccess($val, "Employee Archive", $query);
}

checkEndpoint();
