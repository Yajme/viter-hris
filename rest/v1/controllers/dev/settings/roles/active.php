<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    checkPayload($data);
    $val = new Roles($conn);
    $val->role_aid = $_GET["id"];
    $val->role_is_active = $data["isActive"];
    checkId($val->role_aid);
    $query = checkActive($val);
    http_response_code(200); // OK
    returnSuccess($val, "Roles Archive", $query);
}

checkEndpoint();
