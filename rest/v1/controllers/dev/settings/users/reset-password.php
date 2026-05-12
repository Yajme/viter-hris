<?php

//  set http header
require '../../../../core/header.php';
require '../../../../core/Encryption.php';
// use needed functions
require '../../../../core/functions.php';
// use notification email
require '../../../../notifications/reset-password.php';
// use models
require '../../../../models/developers/settings/users/Users.php';
// database
$conn = null;
$conn = checkDbConnection();
// models
$val = new Users($conn);
$encrypt = new Encryption();
// get payload
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if(isset($_SERVER['HTTP_AUTHORIZATION'])){
    // validate data
    checkPayload($data);
    $val->users_key = $encrypt->doHash(rand());
    $val->users_updated = date('Y-m-d H:i:s');
    $val->users_email = trim($data['item']);
    $password_link = "/create-password";

    $query = $val->readLogin();
    if($query->rowCount() == 0) returnError('Invalid email. Please use a registered one.');
    
    $mailCount = 0;
    $query = checkResetPassword($val);
    if($query->rowCount() > 0){
        $mail = sendEmail(
            $password_link,
            $val->users_email,
            $val->users_key
        );
        if($mail['mail_success']) $mailCount++;
    }
    returnSuccess($val, 'User reset password', $query, $mailCount);
}

http_response_code(200);
checkAccess();