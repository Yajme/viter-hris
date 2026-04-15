<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Roles($conn);
    $val->role_aid = $data["role_aid"];
    $val->role_name = $data["role_name"];
    $val->role_description = $data["role_description"];

    checkId($val->role_aid);
    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Roles Update", $query);
}

checkEndpoint();
