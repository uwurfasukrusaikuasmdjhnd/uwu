<?php
// db.php — Conexión a la base de datos usada en evaluaciones anteriores.
// AJUSTA estos valores a tu propia base de datos (nombre, usuario, contraseña).
// En la instancia AWS (Ubuntu Server) normalmente serán los datos de tu MySQL/MariaDB local.

$DB_HOST = "localhost";
$DB_NAME = "sportclub_inmobiliaria"; // <-- cambia por el nombre real de tu BD
$DB_USER = "root";                   // <-- cambia por tu usuario real
$DB_PASS = "";                       // <-- cambia por tu contraseña real

try {
    $pdo = new PDO(
        "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "ok" => false,
        "message" => "Error de conexión a la base de datos: " . $e->getMessage(),
    ]);
    exit;
}
