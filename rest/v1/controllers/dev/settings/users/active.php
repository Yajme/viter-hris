<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    checkPayload($data);
    $val = new Users($conn);
    $val->users_aid = $_GET["id"];
    $val->users_is_active = $data["isActive"];
    checkId($val->users_aid);
    $query = checkActive($val);
    http_response_code(200); // OK
    returnSuccess($val, "Users Archive", $query);
}

checkEndpoint();
