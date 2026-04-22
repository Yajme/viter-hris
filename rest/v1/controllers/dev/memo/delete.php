<?php
use App\Models\Dev\Memo\Memo;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Memo($conn);
    $val->memo_aid = $_GET["id"];

    checkId($val->memo_aid);
    $query = checkDelete($val);
    http_response_code(200); // OK
    returnSuccess($val, "Memo Delete", $query);
}

checkEndpoint();
