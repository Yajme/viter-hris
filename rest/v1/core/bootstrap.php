<?php
declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0'); // prod-safe

set_error_handler(function($severity, $message, $file, $line) {
    throw new ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(function(Throwable $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    error_log($e); // keep details in logs
    echo json_encode([
        'success' => false,
        'error' => 'Internal Server Error'
    ]);
});

register_shutdown_function(function() {
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        http_response_code(500);
        header('Content-Type: application/json');
        error_log(print_r($e, true));
        echo json_encode(['success' => false, 'error' => 'Fatal error']);
    }
});
