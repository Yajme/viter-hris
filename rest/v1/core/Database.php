<?php
// namespace V1\Core;

class Database
{
    private static $dbConnection;

    public static function connectDb()
    {
       
        // Localhost
        $host = $_ENV['DB_HOST'];
        $dbname = $_ENV['DB_NAME'];
        $username = $_ENV['DB_USERNAME'];
        $password = $_ENV['DB_PASSWORD'];

        if (self::$dbConnection === null) {
            self::$dbConnection = new PDO(
                "mysql:host={$host};dbname={$dbname};",
                $username,
                $password,
                [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC],
            );
            self::$dbConnection->setAttribute(
                PDO::ATTR_ERRMODE,
                PDO::ERRMODE_EXCEPTION,
            );
            self::$dbConnection->setAttribute(
                PDO::ATTR_EMULATE_PREPARES,
                false,
            );
        }

        return self::$dbConnection;
    }
}
