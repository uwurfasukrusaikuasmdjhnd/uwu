<?php
$servername = "localhost";
$username   = "admin";
$password   = "Colocolo123";
$dbname     = "inmobiliaria";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$titulo      = $_POST['titulo'] ?? '';
$descripcion = $_POST['descripcion'] ?? '';
$precio      = $_POST['precio'] ?? 0;

$sql = "INSERT INTO propiedades (titulo, descripcion, precio) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssd", $titulo, $descripcion, $precio);

if ($stmt->execute()) {
    echo "Registro guardado correctamente";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
