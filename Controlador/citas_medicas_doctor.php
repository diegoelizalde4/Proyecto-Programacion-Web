<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $servername = "localhost";
    $username = "root"; // Usuario de MySQL (puede variar)
    $password = ""; // Contraseña de MySQL (puede variar)
    $dbname = "web_medica";
    $port = 3306;

    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Error al conectar con la base de datos"]);
        exit();
    }

    if (!isset($_GET['id'])) {
        echo json_encode(["success" => false, "message" => "ID del doctor no proporcionado"]);
        exit();
    }

    $doctorId = htmlspecialchars($_GET['id']);

    $sql = "SELECT * FROM citas_medicas WHERE Doctor_ID = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta"]);
        exit();
    }

    $stmt->bind_param("s", $doctorId);
    $stmt->execute();
    $result = $stmt->get_result();

    $appointments = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $appointments[] = array(
                "Usuario" => $row["Usuario"],
                "Fecha" => $row["Fecha"],
                "Hora" => $row["Hora"]
            );
        }
        echo json_encode(["success" => true, "appointments" => $appointments]);
    } else {
        echo json_encode(["success" => true, "appointments" => []]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
