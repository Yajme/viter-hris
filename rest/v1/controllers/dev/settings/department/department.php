<?php
require_once __DIR__ . '/../../../../core/bootstrap.php';

use App\Models\Dev\Settings\Department\Department;


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
