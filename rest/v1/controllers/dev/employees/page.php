<?php
// require_once __DIR__ . '/../../../../vendor/autoload.php';

// use v1\models\developers\employees\Employees;

// set http header
require "../../../core/header.php";
// functions
require "../../../core/functions.php";
//models
require "../../../models/developers/employees/Employees.php";
// returnError($_SERVER["HTTP_AUTHORIZATION"]);
if (isset($_SERVER["HTTP_AUTHORIZATION"])) {
    try {
        $body = file_get_contents("php://input");
        $data = json_decode($body, true);

        // check database connection
        $conn = null;
        $conn = checkDbConnection($conn);
        // make use of classes
        $val = new Employees($conn);
        if (array_key_exists("start", $_GET)) {
            checkPayload($data);

            $val->start = $_GET["start"];
            $val->total = 10;
            $val->employee_is_active = $data["filterData"];// == "" ? "" : intval($data["filterData"]);
            $val->search = $data["searchValue"];

            checkLimitId($val->start, $val->total);

            $query = checkReadLimit($val);
            $total_result = checkReadAll($val);
            http_response_code(200); // OK
            checkReadQuery($query, $total_result, $val->total, $val->start);
        }
    } catch (Exception $ex) {
        echo $ex;
    }
}
checkEndpoint();
