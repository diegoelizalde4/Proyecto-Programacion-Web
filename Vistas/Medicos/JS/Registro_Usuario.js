// JavaScript para el Registro de Usuario de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const registerUserForm = document.getElementById("register-user-form");

    registerUserForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(registerUserForm);
        const userId = formData.get("id");
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");
        const lastName = formData.get("last_name");
        const age = formData.get("age");
        const phone = formData.get("phone");

        fetch("http://localhost/clinica_api/agregar_users.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                id: userId,
                email: email,
                password: password,
                name: name,
                last_name: lastName,
                age: age,
                phone: phone
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Usuario registrado exitosamente");
                registerUserForm.reset();
            } else {
                alert("Error al registrar el usuario: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error al registrar el usuario:", error);
            alert("Hubo un problema al registrar el usuario. Intenta de nuevo más tarde.");
        });
    });
});
