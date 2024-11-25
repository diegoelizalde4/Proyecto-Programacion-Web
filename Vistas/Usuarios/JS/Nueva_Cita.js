// JavaScript para la página de Nueva Cita de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const doctorSelect = document.getElementById("doctor-select");
    const newAppointmentForm = document.getElementById("new-appointment-form");

    // Función para obtener los doctores disponibles
    function fetchDoctors() {
        fetch("http://localhost/clinica_api/obtener_doctores.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    populateDoctorSelect(data.doctors);
                } else {
                    console.error("Error al obtener los doctores: " + data.message);
                    alert("Error al obtener los doctores: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error al obtener los doctores:", error);
                alert("Hubo un problema al obtener los doctores. Intenta de nuevo más tarde.");
            });
    }

    // Función para llenar el select de doctores
    function populateDoctorSelect(doctors) {
        if (Array.isArray(doctors)) {
            doctors.forEach(doctor => {
                const option = document.createElement("option");
                option.value = doctor.Professional_Id;
                option.textContent = doctor.Name;
                doctorSelect.appendChild(option);
            });
        } else {
            console.error("Los datos de los doctores no están en el formato esperado.");
        }
    }

    // Manejar el formulario de nueva cita
    newAppointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            alert("No se ha iniciado sesión correctamente.");
            window.location.href = "../../Inicio_Sesion.html";
            return;
        }

        const formData = new FormData(newAppointmentForm);
        const doctorId = formData.get("doctor");
        const date = formData.get("date");
        const time = formData.get("time");

        fetch("http://localhost/clinica_api/agregar_cita.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                userId: userId,
                doctorId: doctorId,
                date: date,
                time: time
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cita agendada exitosamente");
                newAppointmentForm.reset();
            } else {
                alert("Error al agendar la cita: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error al agendar la cita:", error);
            alert("Hubo un problema al agendar la cita. Intenta de nuevo más tarde.");
        });
    });

    // Inicializar
    fetchDoctors();
});
