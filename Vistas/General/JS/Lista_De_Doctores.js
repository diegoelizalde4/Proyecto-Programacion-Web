// JavaScript para la página Lista de Doctores de la Clínica Vida Saludable

document.addEventListener("DOMContentLoaded", function() {
    fetchDoctors();
});

function fetchDoctors() {
    // Llamada a la API PHP para obtener los doctores desde la base de datos
    fetch("http://localhost/clinica_api/doctors.php")
        .then(response => response.json())
        .then(data => {
            renderDoctors(data);
        })
        .catch(error => {
            console.error("Error fetching doctors:", error);
        });
}

function renderDoctors(doctors) {
    const doctorsContainer = document.getElementById("doctors-container");
    doctorsContainer.innerHTML = "";

    doctors.forEach(doctor => {
        const doctorCard = document.createElement("div");
        doctorCard.classList.add("doctor-card");

        const doctorPhoto = document.createElement("img");
        doctorPhoto.classList.add("doctor-photo");
        //NO SIRVE DE OTRA FORMA :(
        doctorPhoto.src = `file:///C:/Users/diego/Documents/Proyecto%20Programacion%20web/Vistas/Medicos/RECURSOS/Imagenes_Doctores/${doctor.Id}.jpg`;

        doctorPhoto.alt = `Foto de ${doctor.Name}`;

        const doctorInfo = document.createElement("div");
        doctorInfo.classList.add("doctor-info");

        const doctorName = document.createElement("h3");
        doctorName.textContent = `${doctor.Name} ${doctor.Last_Name}`;

        const doctorAge = document.createElement("p");
        doctorAge.textContent = `Edad: ${doctor.Age}`;

        const doctorEmail = document.createElement("p");
        doctorEmail.textContent = `Email: ${doctor.Email}`;

        const doctorProfessionalId = document.createElement("p");
        doctorProfessionalId.textContent = `ID Profesional: ${doctor.Professional_Id}`;

        const doctorSpeciality = document.createElement("p");
        doctorSpeciality.textContent = `Especialidad: ${doctor.Speciality}`;

        doctorInfo.appendChild(doctorName);
        doctorInfo.appendChild(doctorAge);
        doctorInfo.appendChild(doctorEmail);
        doctorInfo.appendChild(doctorProfessionalId);
        doctorInfo.appendChild(doctorSpeciality);

        doctorCard.appendChild(doctorPhoto);
        doctorCard.appendChild(doctorInfo);

        doctorsContainer.appendChild(doctorCard);
    });
}
