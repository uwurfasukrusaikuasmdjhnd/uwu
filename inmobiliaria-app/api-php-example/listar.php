<?php
header('Content-Type: application/json');

$servername = "localhost";
$username   = "admin";
$password   = "Colocolo123";
$dbname     = "inmobiliaria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error de conexión: " . $conn->connect_error]));
}

$sql = "SELECT id, titulo, descripcion, precio FROM propiedades";
$result = $conn->query($sql);

$propiedades = [];
while ($row = $result->fetch_assoc()) {
    $propiedades[] = $row;
}

echo json_encode($propiedades);

$conn->close();
?>
