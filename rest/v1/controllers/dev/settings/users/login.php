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
    $val->users_email = $data["user_other_email"];
    $password = $data["password"];

    $key = "jwt_admin_ko_ito";
    $result = checkLogin($val);

    $row = $result->fetch(PDO::FETCH_ASSOC);
    extract($row);
    loginAccess($password, $users_password, $users_email,$row,$result,$key);
    checkEndpoint();
