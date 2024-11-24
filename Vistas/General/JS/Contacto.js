// JavaScript para la página Contacto de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(contactForm);

        fetch("http://localhost/clinica_api/send_email.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (response.ok) {
                alert("Correo enviado exitosamente");
                contactForm.reset();
            } else {
                alert("Error al enviar el correo: " + data.message);
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema al enviar el correo. Intenta de nuevo más tarde.");
        });
    });
});
