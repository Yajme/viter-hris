<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Roles($conn);
    $val->role_aid = $_GET["id"];

    checkId($val->role_aid);
    $query = checkDelete($val);
    http_response_code(200); // OK
    returnSuccess($val, "Roles Delete", $query);
}

checkEndpoint();
