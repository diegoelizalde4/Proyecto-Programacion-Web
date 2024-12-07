<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $message = htmlspecialchars($_POST['message']);

    $to = "a23110331@ceti.mx";
    $subject = "Contacto desde Clínica Vida Saludable";
    $body = "Nombre: $name\nCorreo: $email\nTeléfono: $phone\nMensaje: $message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        http_response_code(200);
        echo json_encode(["message" => "Correo enviado exitosamente"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Error al enviar el correo"]);
    }
} else {
    http_response_code(403);
    echo json_encode(["message" => "Método no permitido"]);
}
?>
