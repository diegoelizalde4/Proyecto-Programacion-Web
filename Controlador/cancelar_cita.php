<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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

    $doctorId = htmlspecialchars($_POST['doctorId']);
    $date = htmlspecialchars($_POST['date']);
    $time = htmlspecialchars($_POST['time']);

    $sql = "DELETE FROM citas_medicas WHERE Doctor_ID = ? AND Fecha = ? AND Hora = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $doctorId, $date, $time);

    if ($stmt->execute() && $stmt->affected_rows > 0) {
        echo json_encode(["success" => true, "message" => "Cita cancelada exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontró la cita o no se pudo cancelar"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
