<?php
require_once __DIR__ . '/../../../core/bootstrap.php';

use App\Models\Dev\Memo\Memo;

//returnError($_SERVER["HTTP_AUTHORIZATION"]);

    try {
        $body = file_get_contents("php://input");
        $data = json_decode($body, true);

        // check database connection
        $conn = null;
        $conn = checkDbConnection($conn);
        // make use of classes
        $val = new Memo($conn);
        if (array_key_exists("start", $_GET)) {
            checkPayload($data);

            $val->start = (int)$_GET["start"];
            $val->total = 10;
            $val->memo_is_active = $data["filterData"];// == "" ? "" : intval($data["filterData"]);
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
    checkEndpoint();
