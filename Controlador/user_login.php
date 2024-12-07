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

    if (!isset($_POST['email'], $_POST['password'])) {
        echo json_encode(["success" => false, "message" => "Datos incompletos para el inicio de sesión"]);
        exit();
    }

    $email = htmlspecialchars($_POST['email']);
    $password = htmlspecialchars($_POST['password']);

    // Verificar credenciales del usuario
    $sql = "SELECT * FROM usuarios WHERE Email = ? AND Pass = ?";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta"]);
        exit();
    }

    $stmt->bind_param("ss", $email, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso", "userId" => $user['Id']]);
    } else {
        echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
