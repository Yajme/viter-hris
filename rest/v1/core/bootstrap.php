<?php
declare(strict_types=1);

use App\Core\Logger;

require_once __DIR__ . '/../../vendor/autoload.php';

$logger = new Logger(__DIR__ . '/../../logs/app.log');

set_error_handler(function($severity, $message, $file, $line) {
    if (!(error_reporting() & $severity)) {
        return false;
    }

    throw new ErrorException($message, 0, $severity, $file, $line);
});

set_exception_handler(function(Throwable $e) use ($logger) {
    $logger->critical('Uncaught exception', [
        'message' => $e->getMessage(),
        'type' => get_class($e),
        'file' => $e->getFile(),
        'line' => $e->getLine(),
        'trace' => $e->getTraceAsString(),
        'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'CLI',
        'request_uri' => $_SERVER['REQUEST_URI'] ?? '',
        'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? '',
    ]);

    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error'   => 'Internal Server Error'
    ]);
});

register_shutdown_function(function() use ($logger) {
    $e = error_get_last();
    if ($e && in_array($e['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
        $logger->critical('Fatal crash', [
            'message' => $e['message'],
            'file' => $e['file'],
            'line' => $e['line'],
            'type' => $e['type'],
            'request_method' => $_SERVER['REQUEST_METHOD'] ?? 'CLI',
            'request_uri' => $_SERVER['REQUEST_URI'] ?? '',
            'remote_addr' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        http_response_code(500);
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'error' => 'Fatal error']);
    }
});

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, '../../.env');
$dotenv->load();
error_reporting(E_ALL);
ini_set('display_errors', '0'); // prod-safe
