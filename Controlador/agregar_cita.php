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

    if (!isset($_POST['doctorId'], $_POST['user'], $_POST['date'], $_POST['time'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos para agregar la cita"]);
        exit();
    }

    $doctorId = htmlspecialchars($_POST['doctorId']);
    $userId = htmlspecialchars($_POST['user']);
    $date = htmlspecialchars($_POST['date']);
    $time = htmlspecialchars($_POST['time']);

    // Verificar si el usuario existe en la base de datos
    $checkUserSql = "SELECT * FROM usuarios WHERE Id = ?";
    $checkUserStmt = $conn->prepare($checkUserSql);
    if ($checkUserStmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta de verificación de usuario"]);
        exit();
    }

    $checkUserStmt->bind_param("s", $userId);
    $checkUserStmt->execute();
    $userResult = $checkUserStmt->get_result();

    if ($userResult->num_rows == 0) {
        echo json_encode(["success" => false, "message" => "El usuario no existe"]);
        $checkUserStmt->close();
        $conn->close();
        exit();
    }

    // Insertar la nueva cita
    $sql = "INSERT INTO citas_medicas (Doctor_ID, Usuario, Fecha, Hora) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta"]);
        exit();
    }

    $stmt->bind_param("ssss", $doctorId, $userId, $date, $time);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Cita agregada exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al agregar la cita: " . $stmt->error]);
    }

    $stmt->close();
    $checkUserStmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
