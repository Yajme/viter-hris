<?php

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$val = new Roles($conn);
$val->role_is_active = 1;
$val->role_name = trim($data["role_name"]);
$val->role_description = $data["role_description"];

isNameExist($val, $val->role_name);
$query = checkCreate($val);
http_response_code(201); // CREATED
returnSuccess($val, "Roles Create", $query);