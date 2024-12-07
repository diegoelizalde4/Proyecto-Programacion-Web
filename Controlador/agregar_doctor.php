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
        echo json_encode(["success" => false, "message" => "Error al conectar con la base de datos: " . $conn->connect_error]);
        exit();
    }

    $id = $_POST['id'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $name = $_POST['name'];
    $last_name = $_POST['last_name'];
    $age = $_POST['age'];
    $phone = $_POST['phone'];
    $professional_id = $_POST['professional_id'];
    $specialty = $_POST['speciality']; // Campo de especialidad

    // Verificar si el ID ya existe
    $checkSql = "SELECT * FROM medicos WHERE Id = ?";
    $stmt = $conn->prepare($checkSql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta de verificación: " . $conn->error]);
        $conn->close();
        exit();
    }
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "El ID ya está en uso"]);
        $stmt->close();
        $conn->close();
        exit();
    }
    $stmt->close();

    // Insertar datos en la base de datos
    $sql = "INSERT INTO medicos (Id, Email, Pass, Name, Last_Name, Age, Phone, Professional_Id, Speciality) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(["success" => false, "message" => "Error al preparar la consulta de inserción: " . $conn->error]);
        $conn->close();
        exit();
    }

    $stmt->bind_param("sssssssss", $id, $email, $password, $name, $last_name, $age, $phone, $professional_id, $specialty); // Bindeo de parámetros
    if ($stmt->execute()) {
        
        } else {
            echo json_encode(["success" => false, "message" => "No se recibió la imagen del médico"]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Error al ejecutar la consulta de inserción: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}
?>
