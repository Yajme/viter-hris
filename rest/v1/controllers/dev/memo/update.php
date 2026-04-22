<?php
use App\Models\Dev\Memo\Memo;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
if (array_key_exists("id", $_GET)) {
    $val = new Memo($conn);
    $val->memo_aid = $data["memo_aid"];
    $val->memo_from = $data["memo_from"];
    $val->memo_to = $data["memo_to"];
    $val->memo_date = $data["memo_date"];
    $val->memo_category = $data["memo_category"];
    $val->memo_text = $data["memo_text"];

    //Data validation
    checkId($val->memo_aid);

    $query = checkUpdate($val);
    http_response_code(200); // OK
    returnSuccess($val, "Memo Update", $query);
}

checkEndpoint();
