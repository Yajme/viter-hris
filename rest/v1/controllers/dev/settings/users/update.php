<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Users($conn);
    $val->users_aid = $data["users_aid"];
    $val->users_name = $data["users_name"];
    $val->users_description = $data["users_description"];

    //Data validation
    checkId($val->users_aid);
    compareName($val, $data["users_name_old"], $val->users_name);
    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Users Update", $query);
}

checkEndpoint();
