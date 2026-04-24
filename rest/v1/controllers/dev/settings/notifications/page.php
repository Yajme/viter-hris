<?php
require_once __DIR__ . '/../../../../core/bootstrap.php';
use App\Models\Dev\Settings\Notifications\Notifications;

//returnError($_SERVER["HTTP_AUTHORIZATION"]);

    try {
        $body = file_get_contents("php://input");
        $data = json_decode($body, true);

        // check database connection
        $conn = null;
        $conn = checkDbConnection($conn);
        // make use of classes
        $val = new Notifications($conn);
        if (array_key_exists("start", $_GET)) {
            checkPayload($data);

            $val->filters["start"] = (int)$_GET["start"];
            $val->filters["total"] = 10;
            $val->columnNames["notification_is_active"] = $data["filterData"];
            $val->filters["search"] = $data["searchValue"];

            checkLimitId($val->filters["start"] , $val->filters["total"]);

            $query = checkReadLimit($val);
            $total_result = checkReadAll($val);
            http_response_code(200); // OK
            checkReadQuery($query, $total_result, $val->filters["total"], $val->filters["start"]);
        }
    } catch (Exception $ex) {
        echo $ex;
    }
    checkEndpoint();
