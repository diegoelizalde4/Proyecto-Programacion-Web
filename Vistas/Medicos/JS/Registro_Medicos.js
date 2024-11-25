// JavaScript para la página de Registro de Médicos de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const registerDoctorForm = document.getElementById("register-doctor-form");

    registerDoctorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(registerDoctorForm);
        const id = formData.get("id");
        const email = formData.get("email");
        const password = formData.get("password");
        const name = formData.get("name");
        const lastName = formData.get("last_name");
        const age = formData.get("age");
        const phone = formData.get("phone");
        const professionalId = formData.get("professional_id");
        const specialty = formData.get("specialty");

        // Crear un objeto FormData para enviar los datos al servidor
        const doctorData = new URLSearchParams();
        doctorData.append("id", id);
        doctorData.append("email", email);
        doctorData.append("password", password);
        doctorData.append("name", name);
        doctorData.append("last_name", lastName);
        doctorData.append("age", age);
        doctorData.append("phone", phone);
        doctorData.append("professional_id", professionalId);
        doctorData.append("speciality", specialty);

        fetch("http://localhost/clinica_api/agregar_doctor.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: doctorData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Médico registrado exitosamente");
                registerDoctorForm.reset();
            } else {
                alert("Error al registrar el médico: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error al registrar el médico:", error);
            alert("Hubo un problema al registrar el médico. Intenta de nuevo más tarde.");
        });
    });
});
