<?php
use App\Models\Dev\Memo\Memo;
// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$val = new Memo($conn);
$val->memo_from = $data["memo_from"];
$val->memo_to = $data["memo_to"];
$val->memo_date = $data["memo_date"];
$val->memo_category = $data["memo_category"];
$val->memo_text = $data["memo_text"];

$query = checkCreate($val);
http_response_code(201); // CREATED
returnSuccess($val, "Users Create", $query);
