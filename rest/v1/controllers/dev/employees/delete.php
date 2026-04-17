<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Employees($conn);
    $val->employee_aid = $_GET["id"];

    checkId($val->employee_aid);
    $query = checkDelete($val);
    http_response_code(200); // OK
    returnSuccess($val, "Employees Delete", $query);
}

checkEndpoint();
