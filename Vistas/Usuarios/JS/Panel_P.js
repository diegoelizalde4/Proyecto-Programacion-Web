// JavaScript para el Panel del Usuario de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const appointmentDetails = document.getElementById("appointment-details");

    // Función para obtener las citas del usuario
    function fetchAppointments() {
        const userId = sessionStorage.getItem("userId");
        if (!userId) {
            alert("No se ha iniciado sesión correctamente.");
            window.location.href = "../../Inicio_Sesion.html";
            return;
        }

        fetch(`http://localhost/clinica_api/obtener_citas_usuario.php?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchDoctors(data.appointments);
                } else {
                    alert("Error al obtener las citas: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un problema al obtener las citas. Intenta de nuevo más tarde.");
            });
    }

    // Función para obtener los nombres de los doctores
    function fetchDoctors(appointments) {
        fetch("http://localhost/clinica_api/obtener_doctores.php")
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const doctors = data.doctors;
                    renderAppointments(appointments, doctors);
                } else {
                    console.error("Error al obtener los doctores: " + data.message);
                    alert("Error al obtener los doctores: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un problema al obtener los doctores. Intenta de nuevo más tarde.");
            });
    }

    // Función para renderizar las citas
    function renderAppointments(appointments, doctors) {
        appointmentDetails.innerHTML = "";
        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                const doctor = doctors[appointment.Doctor];
                const doctorName = doctor ? doctor : "No disponible";
                const li = document.createElement("li");
                li.textContent = `Doctor: ${doctorName}, Fecha: ${appointment.Fecha}, Hora: ${appointment.Hora}`;
                appointmentDetails.appendChild(li);
            });
        } else {
            appointmentDetails.innerHTML = "<li>No tienes citas programadas.</li>";
        }
    }

    // Inicializar
    fetchAppointments();
});
