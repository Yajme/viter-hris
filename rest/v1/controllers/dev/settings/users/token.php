<?php
 require_once __DIR__ . '/../../../../core/bootstrap.php';

//models
use App\Models\Dev\Settings\Users\Users;

// check database connection
$conn = null;
$conn = checkDbConnection($conn);
// make use of classes
$body = file_get_contents("php://input");
$data = json_decode($body, true);

    checkPayload($data);
    $val = new Users($conn);
   
    $token = $data['token'];
    $key = $_ENV['JWT_KEY'];
    tokenUser($val,$token,$key);
    checkEndpoint();
