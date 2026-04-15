<?php

//set http header
require "../../../../core/header.php";
// functions
require "../../../../core/functions.php";
//models
require "../../../../models/developers/settings/roles/Roles.php";

$body = file_get_contents("php://input");
$data = json_decode($body, true);

//CREATE / POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $result = require "create.php";
    sendResponse($result);
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $result = require "read.php";
    sendResponse($result);
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    $result = require "update.php";
    sendResponse($result);
    exit();
}
