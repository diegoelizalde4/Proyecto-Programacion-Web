<?php
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
        echo json_encode(["success" => false, "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
        exit();
    }

    $sql = "SELECT Professional_Id, Name FROM medicos";
    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $doctors = [];
        while ($row = $result->fetch_assoc()) {
            $doctors[] = [
                'Professional_Id' => $row['Professional_Id'],
                'Name' => $row['Name']
            ];
        }
        echo json_encode(["success" => true, "doctors" => $doctors]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontraron doctores"]);
    }

    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
