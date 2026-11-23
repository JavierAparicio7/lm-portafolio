// torneo.js · Validación a medida de la inscripción al torneo

const nacimiento = document.getElementById('nacimiento');
const equipo = document.getElementById('equipo');
const jugadores = document.getElementById('jugadores');
const nivel = document.getElementById('nivel');
const valorNivel = document.getElementById('valor-nivel');
const radiosModalidad = document.querySelectorAll('input[name="modalidad"]');

const EDAD_MINIMA = 16;

function aTextoFecha(d) {
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// No se puede elegir una fecha de nacimiento futura
nacimiento.max = aTextoFecha(new Date());

// Edad mínima de 16 años calculada con la fecha de nacimiento
function comprobarEdad() {
  nacimiento.setCustomValidity('');
  if (!nacimiento.value) return;

  const [a, m, d] = nacimiento.value.split('-').map(Number);
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;
  // si este año todavía no ha cumplido, le resto uno
  if (hoy.getMonth() + 1 < m || (hoy.getMonth() + 1 === m && hoy.getDate() < d)) {
    edad--;
  }

  if (edad < EDAD_MINIMA) {
    nacimiento.setCustomValidity(`Tienes que tener al menos ${EDAD_MINIMA} años para apuntarte, ahora tienes ${edad}.`);
  }
}
nacimiento.addEventListener('input', comprobarEdad);
nacimiento.addEventListener('change', comprobarEdad);

// Si juega por equipos, el nombre del equipo es obligatorio y tiene que haber al menos 2 jugadores
function comprobarEquipo() {
  const porEquipos = document.getElementById('mod-equipo').checked;
  equipo.required = porEquipos;
  jugadores.min = porEquipos ? 2 : 1;

  equipo.setCustomValidity(
    porEquipos && equipo.value.trim() === '' ? 'Si juegas por equipos, escribe el nombre del equipo.' : ''
  );
}
radiosModalidad.forEach(radio => radio.addEventListener('change', comprobarEquipo));
equipo.addEventListener('input', comprobarEquipo);

// Muestra el valor del nivel al mover el control
nivel.addEventListener('input', () => {
  valorNivel.textContent = nivel.value;
});
