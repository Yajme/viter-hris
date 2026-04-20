<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Users($conn);
    $val->users_aid = $_GET["id"];

    checkId($val->users_aid);
    $query = checkDelete($val);
    http_response_code(200); // OK
    returnSuccess($val, "Users Delete", $query);
}

checkEndpoint();
