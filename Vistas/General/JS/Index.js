// JavaScript para la página de inicio de la Clínica Vida Saludable

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

// Funcionalidad para suavizar el desplazamiento cuando se hace clic en los enlaces del menú
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Evento para manejar el cambio de color del navbar al desplazarse
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
