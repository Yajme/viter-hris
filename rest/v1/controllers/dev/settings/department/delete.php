<?php
use App\Models\Dev\Settings\Department\Department;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Department($conn);
    $val->department_aid = $_GET["id"];

    checkId($val->department_aid);
    $query = checkDelete($val);
    http_response_code(200); // OK
    returnSuccess($val, "Department Delete", $query);
}

checkEndpoint();
