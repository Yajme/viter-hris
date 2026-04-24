<?php
use App\Models\Dev\Settings\Department\Department;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$val = new Department($conn);
$val->department_name = trim($data["department_name"]);

isNameExist($val, $val->department_name);
$query = checkCreate($val);
http_response_code(201); // CREATED
returnSuccess($val, "Department Create", $query);
