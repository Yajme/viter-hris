
<?php

try
{
    // check database connection
    $conn = null;
    $conn = checkDbConnection($conn);
    // make use of classes
    $val = new Employees($conn);
    $val->employee_is_active = 1;
    $val->employee_first_name = trim($data["employee_first_name"]);
    $val->employee_middle_name = trim($data["employee_middle_name"]);
    $val->employee_last_name = trim($data["employee_last_name"]);
    $val->employee_email = $data["employee_email"];
    
    isNameExist($val, $val->employee_first_name);
    $query = checkCreate($val);
    http_response_code(201); // CREATED
    returnSuccess($val, "Employees Create", $query);

}catch(Exception $ex) {
    echo $ex;
}