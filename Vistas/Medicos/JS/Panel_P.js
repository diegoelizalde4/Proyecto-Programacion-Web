// JavaScript para el Panel del Doctor de la Clínica Vida Saludable
document.addEventListener("DOMContentLoaded", function() {
    const calendar = document.getElementById("calendar");
    const appointmentsList = document.getElementById("appointments-list");
    const appointmentDetails = document.getElementById("appointment-details");
    const addAppointmentBtn = document.getElementById("add-appointment-btn");
    const cancelAppointmentBtn = document.getElementById("cancel-appointment-btn");
    const addUserBtn = document.getElementById("add-user-btn");
    const addAppointmentForm = document.getElementById("add-appointment-form");
    const cancelAppointmentForm = document.getElementById("cancel-appointment-form");
    const newAppointmentForm = document.getElementById("new-appointment-form");
    const cancelAppointmentSearchForm = document.getElementById("cancel-appointment-search-form");

    // Mostrar formulario para agregar una cita
    addAppointmentBtn.addEventListener("click", function() {
        addAppointmentForm.classList.toggle("hidden");
        cancelAppointmentForm.classList.add("hidden");
    });

    // Mostrar formulario para cancelar una cita
    cancelAppointmentBtn.addEventListener("click", function() {
        cancelAppointmentForm.classList.toggle("hidden");
        addAppointmentForm.classList.add("hidden");
    });

    // Redireccionar a la página de registro de usuario
    addUserBtn.addEventListener("click", function() {
        window.location.href = "Registro_Usuario.html";
    });

    // Función para agregar una nueva cita
    newAppointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(newAppointmentForm);
        const user = formData.get("user");
        const date = formData.get("date");
        const time = formData.get("time");
        const doctorId = sessionStorage.getItem("doctorId");

        fetch("http://localhost/clinica_api/agregar_cita.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                doctorId: doctorId,
                user: user,
                date: date,
                time: time
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cita agregada exitosamente");
                newAppointmentForm.reset();
                fetchAppointments();
            } else {
                alert("Error al agregar la cita: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error al agregar la cita:", error);
            alert("Hubo un problema al agregar la cita. Intenta de nuevo más tarde.");
        });
    });

    // Función para cancelar una cita
    cancelAppointmentSearchForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = new FormData(cancelAppointmentSearchForm);
        const date = formData.get("date");
        const time = formData.get("time");
        const doctorId = sessionStorage.getItem("doctorId");

        fetch("http://localhost/clinica_api/cancelar_cita.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                doctorId: doctorId,
                date: date,
                time: time
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Cita cancelada exitosamente");
                cancelAppointmentSearchForm.reset();
                fetchAppointments();
            } else {
                alert("Error al cancelar la cita: " + (data.message || "Error desconocido"));
            }
        })
        .catch(error => {
            console.error("Error al cancelar la cita:", error);
            alert("Hubo un problema al cancelar la cita. Intenta de nuevo más tarde.");
        });
    });

    // Función para obtener las citas del doctor
    function fetchAppointments() {
        const doctorId = sessionStorage.getItem("doctorId");
        if (!doctorId) {
            alert("No se ha iniciado sesión correctamente.");
            window.location.href = "../../Inicio_Sesion.html";
            return;
        }

        fetch(`http://localhost/clinica_api/citas_medicas_doctor.php?id=${doctorId}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    renderAppointments(data.appointments);
                } else {
                    alert("Error al obtener las citas: " + data.message);
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Hubo un problema al obtener las citas. Intenta de nuevo más tarde.");
            });
    }

    // Función para renderizar las citas
    function renderAppointments(appointments) {
        appointmentDetails.innerHTML = "";
        if (appointments.length > 0) {
            appointments.forEach(appointment => {
                const li = document.createElement("li");
                li.textContent = `Usuario: ${appointment.Usuario}, Fecha: ${appointment.Fecha}, Hora: ${appointment.Hora}`;
                appointmentDetails.appendChild(li);
            });
            appointmentsList.classList.remove("hidden");
        } else {
            appointmentsList.classList.add("hidden");
            alert("No hay citas programadas para este día.");
        }
    }

    // Inicializar
    fetchAppointments();
});
