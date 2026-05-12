<?php
require_once __DIR__ . '/../../../../core/bootstrap.php';
//models
use App\Models\Dev\Settings\Users\Users;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$val = new Users($conn);
$val->users_is_active = 1;
$val->users_first_name = trim($data["users_first_name"]);
$val->users_last_name = trim($data["users_last_name"]);
$val->users_email = trim($data["users_email"]);
$val->users_password = password_hash($data["users_password"], PASSWORD_DEFAULT);
$val->users_role_id = trim($data["users_role_id"]);

isNameExist($val, $val->users_first_name);
$query = checkCreate($val);
http_response_code(201); // CREATED
returnSuccess($val, "Users Create", $query);
