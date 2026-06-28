<?php
// propiedades.php — Endpoint de referencia para el catálogo de propiedades.
//
// Este archivo es una GUÍA: ajusta el nombre de la tabla y las columnas a la
// base de datos que ya construiste en evaluaciones anteriores. Lo importante
// es que la respuesta JSON mantenga esta forma, porque es la que espera
// src/services/propertyService.js en el front-end:
//
//   GET    -> { "ok": true, "data": [ {...}, {...} ] }
//   POST   -> { "ok": true, "data": { ...propiedad creada... } }
//   PUT    -> { "ok": true, "data": { ...propiedad actualizada... } }
//   DELETE -> { "ok": true, "message": "Propiedad eliminada" }

header("Content-Type: application/json; charset=utf-8");

// CORS: necesario porque React (Vite, puerto 5173) y PHP corren en orígenes
// distintos durante el desarrollo. En producción puedes restringir el dominio.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

require_once __DIR__ . "/db.php";

$method = $_SERVER["REQUEST_METHOD"];
$id = isset($_GET["id"]) ? (int) $_GET["id"] : null;

// Convierte una fila de la tabla "propiedades" al formato que usa el front-end.
// Ajusta los nombres de columna ($row["..."]) a los de tu tabla real.
function mapRow($row)
{
    return [
        "id" => (int) $row["id"],
        "title" => $row["titulo"],
        "location" => $row["ubicacion"],
        "price" => (float) $row["precio"],
        "surface_m2" => (int) $row["superficie_m2"],
        "bedrooms" => (int) $row["dormitorios"],
        "bathrooms" => (int) $row["banos"],
        "parking" => (int) $row["estacionamientos"],
        "pool" => (bool) $row["piscina"],
        "year_built" => $row["anio_construccion"] ? (int) $row["anio_construccion"] : null,
        "description" => $row["descripcion"],
        // Si guardas las imágenes como texto separado por comas en la BD:
        "images" => $row["imagenes"] ? explode(",", $row["imagenes"]) : [],
    ];
}

switch ($method) {
    case "GET":
        $stmt = $pdo->query("SELECT * FROM propiedades ORDER BY id DESC");
        $rows = $stmt->fetchAll();
        echo json_encode([
            "ok" => true,
            "data" => array_map("mapRow", $rows),
        ]);
        break;

    case "POST":
        $input = json_decode(file_get_contents("php://input"), true) ?? [];

        $stmt = $pdo->prepare(
            "INSERT INTO propiedades
                (titulo, ubicacion, precio, superficie_m2, dormitorios, banos, estacionamientos, piscina, anio_construccion, descripcion, imagenes)
             VALUES
                (:titulo, :ubicacion, :precio, :superficie_m2, :dormitorios, :banos, :estacionamientos, :piscina, :anio_construccion, :descripcion, :imagenes)"
        );

        $stmt->execute([
            ":titulo" => $input["title"] ?? "",
            ":ubicacion" => $input["location"] ?? "",
            ":precio" => $input["price"] ?? 0,
            ":superficie_m2" => $input["surface_m2"] ?? 0,
            ":dormitorios" => $input["bedrooms"] ?? 0,
            ":banos" => $input["bathrooms"] ?? 0,
            ":estacionamientos" => $input["parking"] ?? 0,
            ":piscina" => !empty($input["pool"]) ? 1 : 0,
            ":anio_construccion" => $input["year_built"] ?? null,
            ":descripcion" => $input["description"] ?? "",
            ":imagenes" => isset($input["images"]) ? implode(",", $input["images"]) : "",
        ]);

        $newId = $pdo->lastInsertId();
        $row = $pdo->query("SELECT * FROM propiedades WHERE id = {$newId}")->fetch();

        echo json_encode(["ok" => true, "data" => mapRow($row)]);
        break;

    case "PUT":
        if (!$id) {
            http_response_code(400);
            echo json_encode(["ok" => false, "message" => "Falta el parámetro id"]);
            break;
        }

        $input = json_decode(file_get_contents("php://input"), true) ?? [];

        $stmt = $pdo->prepare(
            "UPDATE propiedades SET
                titulo = :titulo,
                ubicacion = :ubicacion,
                precio = :precio,
                superficie_m2 = :superficie_m2,
                dormitorios = :dormitorios,
                banos = :banos,
                estacionamientos = :estacionamientos,
                piscina = :piscina,
                anio_construccion = :anio_construccion,
                descripcion = :descripcion,
                imagenes = :imagenes
             WHERE id = :id"
        );

        $stmt->execute([
            ":titulo" => $input["title"] ?? "",
            ":ubicacion" => $input["location"] ?? "",
            ":precio" => $input["price"] ?? 0,
            ":superficie_m2" => $input["surface_m2"] ?? 0,
            ":dormitorios" => $input["bedrooms"] ?? 0,
            ":banos" => $input["bathrooms"] ?? 0,
            ":estacionamientos" => $input["parking"] ?? 0,
            ":piscina" => !empty($input["pool"]) ? 1 : 0,
            ":anio_construccion" => $input["year_built"] ?? null,
            ":descripcion" => $input["description"] ?? "",
            ":imagenes" => isset($input["images"]) ? implode(",", $input["images"]) : "",
            ":id" => $id,
        ]);

        $row = $pdo->query("SELECT * FROM propiedades WHERE id = {$id}")->fetch();
        echo json_encode(["ok" => true, "data" => mapRow($row)]);
        break;

    case "DELETE":
        if (!$id) {
            http_response_code(400);
            echo json_encode(["ok" => false, "message" => "Falta el parámetro id"]);
            break;
        }

        $stmt = $pdo->prepare("DELETE FROM propiedades WHERE id = :id");
        $stmt->execute([":id" => $id]);

        echo json_encode(["ok" => true, "message" => "Propiedad eliminada"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["ok" => false, "message" => "Método no permitido"]);
}
