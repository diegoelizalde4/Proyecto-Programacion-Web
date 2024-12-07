<?php
session_start();

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Inicio de sesión del doctor
    if (isset($_POST['email']) && isset($_POST['password']) && isset($_POST['id'])) {
        $email = htmlspecialchars($_POST['email']);
        $pass = htmlspecialchars($_POST['password']);
        $professionalId = htmlspecialchars($_POST['id']);

        $sql = "SELECT * FROM medicos WHERE Email = ? AND Pass = ? AND Professional_Id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $email, $pass, $professionalId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Inicio de sesión exitoso
            $_SESSION['doctorId'] = $professionalId;
            echo json_encode(["success" => true, "message" => "Inicio de sesión exitoso"]);
        } else {
            // Credenciales incorrectas
            echo json_encode(["success" => false, "message" => "Credenciales incorrectas"]);
        }

        $stmt->close();
    } else {
        // Datos de inicio de sesión no proporcionados
        echo json_encode(["success" => false, "message" => "Datos incompletos para el inicio de sesión"]);
    }
} elseif ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Obtener lista de doctores
    $sql = "SELECT * FROM medicos";
    $result = $conn->query($sql);

    $doctores = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $doctores[] = array(
                "Id" => $row["Id"],
                "Email" => $row["Email"],
                "Name" => $row["Name"],
                "Last_Name" => $row["Last_Name"],
                "Age" => $row["Age"],
                "Phone" => $row["Phone"],
                "Professional_Id" => $row["Professional_Id"],
                "Speciality" => $row["Speciality"]
            );
        }
        echo json_encode($doctores);
    } else {
        echo json_encode([]);
    }
} else {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Método no permitido"]);
}

$conn->close();
?>
