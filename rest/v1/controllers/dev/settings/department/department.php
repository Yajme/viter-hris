<?php
require_once __DIR__ . '/../../../../core/bootstrap.php';

use App\Models\Dev\Settings\Department\Department;


$body = file_get_contents("php://input");
$data = json_decode($body, true);

dispatchResource([
    'POST' => __DIR__ . '/create.php',
    'GET' => __DIR__ . '/read.php',
    'PUT' => __DIR__ . '/update.php',
    'PUT:archive' => __DIR__ . '/active.php',
    'DELETE' => __DIR__ . '/delete.php',
]);
