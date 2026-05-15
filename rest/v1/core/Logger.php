<?php
namespace App\Core;

class Logger
{
    private string $logFile;

    public function __construct(?string $logFile = null)
    {
        $this->logFile = $logFile ?? __DIR__ . '/../../logs/app.log';
    }

    public function error(string $message, array $context = []): void
    {
        $this->write('ERROR', $message, $context);
    }

    public function critical(string $message, array $context = []): void
    {
        $this->write('CRITICAL', $message, $context);
    }

    private function write(string $level, string $message, array $context = []): void
    {
        $dir = dirname($this->logFile);
        if (!is_dir($dir) && !mkdir($dir, 0755, true) && !is_dir($dir)) {
            error_log("[LOGGER] Unable to create log directory: {$dir}");
            return;
        }

        $time = date('Y-m-d H:i:s');
        $contextJson = $context ? json_encode($context, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) : '{}';
        $line = "[{$time}] {$level}: {$message} {$contextJson}" . PHP_EOL;

        error_log($line, 3, $this->logFile);
    }
}
