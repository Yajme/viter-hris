<?php
use App\Models\Dev\Memo\Memo;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
$val = new Memo($conn);

if (empty($_GET)) {
    $val->memo_is_active = "1";
    $query = checkReadAll($val);
    http_response_code(200);
    getQueriedData($query);
}

//return 404 if endpoint not found
checkEndpoint();
