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

    if (!isset($_POST['id'], $_POST['email'], $_POST['password'], $_POST['name'], $_POST['last_name'], $_POST['age'], $_POST['phone'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos para el registro del usuario"]);
        exit();
    }

    $userId = htmlspecialchars($_POST['id']);
    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);
    $name = htmlspecialchars($_POST['name']);
    $lastName = htmlspecialchars($_POST['last_name']);
    $age = htmlspecialchars($_POST['age']);
    $phone = htmlspecialchars($_POST['phone']);

    // Verificar si el ID de usuario ya existe
    $checkUserSql = "SELECT * FROM usuarios WHERE Id = ?";
    $checkUserStmt = $conn->prepare($checkUserSql);
    if ($checkUserStmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta de verificación de usuario"]);
        exit();
    }

    $checkUserStmt->bind_param("s", $userId);
    $checkUserStmt->execute();
    $result = $checkUserStmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El ID de usuario ya está en uso"]);
        $checkUserStmt->close();
        $conn->close();
        exit();
    }

    $checkUserStmt->close();

    // Insertar el nuevo usuario
    $sql = "INSERT INTO usuarios (Id, Email, Pass, Name, Last_Name, Age, Phone) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta"]);
        exit();
    }

    $stmt->bind_param("sssssis", $userId, $email, $password, $name, $lastName, $age, $phone);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Usuario registrado exitosamente"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error al registrar el usuario: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
