<?php
// set http header
require "../../../core/header.php";
// functions
require "../../../core/functions.php";
//models
require "../../../models/developers/employees/Employees.php";


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
    $result =
        $_GET["action"] == "archive"
            ? require "active.php"
            : require "update.php";
    sendResponse($result);
    exit();
}
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $result = require "delete.php";
    sendResponse($result);
    exit();
}
