document.addEventListener("DOMContentLoaded", function() {
    const fechaElemento = document.getElementById("fecha-actual");
    const fechaHoy = new Date().toLocaleDateString("es-ES", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    fechaElemento.textContent = "Hoy es: " + fechaHoy;
});