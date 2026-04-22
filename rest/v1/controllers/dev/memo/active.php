<?php
use App\Models\Dev\Memo\Memo;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    checkPayload($data);
    $val = new Memo($conn);
    $val->memo_aid = $_GET["id"];
    $val->memo_is_active = $data["isActive"];
    checkId($val->memo_aid);
    $query = checkActive($val);
    http_response_code(200); // OK
    returnSuccess($val, "Memo Archive", $query);
}

checkEndpoint();
