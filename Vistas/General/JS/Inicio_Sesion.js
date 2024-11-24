// JavaScript para la página de Inicio de Sesión de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const userBtn = document.getElementById("user-btn");
    const doctorBtn = document.getElementById("doctor-btn");
    const userLoginForm = document.getElementById("user-login-form");
    const doctorLoginForm = document.getElementById("doctor-login-form");

    userBtn.addEventListener("click", function() {
        userBtn.classList.add("active");
        doctorBtn.classList.remove("active");
        userLoginForm.classList.remove("hidden");
        doctorLoginForm.classList.add("hidden");
    });

    doctorBtn.addEventListener("click", function() {
        doctorBtn.classList.add("active");
        userBtn.classList.remove("active");
        doctorLoginForm.classList.remove("hidden");
        userLoginForm.classList.add("hidden");
    });

    // Validación de inicio de sesión para usuarios
    userLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(userLoginForm);
        const email = formData.get("email");
        const password = formData.get("password");

        fetch("http://localhost/clinica_api/users.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = "../../Usuarios/HTML/Panel_P.html";
            } else {
                alert("Error en el inicio de sesión: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema al iniciar sesión. Intenta de nuevo más tarde.");
        });
    });

    // Validación de inicio de sesión para doctores
    doctorLoginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(doctorLoginForm);
        const email = formData.get("email");
        const password = formData.get("password");
        const professionalId = formData.get("id");

        fetch("http://localhost/clinica_api/doctors.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                email: email,
                password: password,
                id: professionalId
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la respuesta del servidor");
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Guardar el ID del doctor en el almacenamiento de sesión
                sessionStorage.setItem("doctorId", professionalId);
                window.location.href = "../../Medicos/HTML/Panel_P.html";
            } else {
                alert("Error en el inicio de sesión: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema al iniciar sesión. Intenta de nuevo más tarde.");
        });
    });
});
