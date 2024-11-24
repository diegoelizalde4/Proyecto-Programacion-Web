// JavaScript para la página Sobre Nosotros de la Clínica Vida Saludable

// Controlar la visibilidad del navbar al desplazarse
let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
    const navbar = document.getElementById("navbar");
    let currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
    } else {
        navbar.style.top = "-80px";
    }
    prevScrollPos = currentScrollPos;
};

// Funcionalidad para resaltar las secciones del menú al hacer scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
            link.classList.add("active");
        }
    });
});
