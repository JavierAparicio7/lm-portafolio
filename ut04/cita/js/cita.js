// cita.js · Validación a medida del formulario de cita del taller de BiciRuta
// Se carga en el head con defer, así se ejecuta cuando el HTML ya está leído

const form = document.getElementById('form-cita');
const fecha = document.getElementById('fecha');
const quieroCuenta = document.getElementById('quiero-cuenta');
const cuenta = document.getElementById('cuenta');
const clave = document.getElementById('clave');
const clave2 = document.getElementById('clave2');
const averia = document.getElementById('averia');
const contador = document.getElementById('contador');
const dni = document.getElementById('dni');
const trampa = document.getElementById('web');

// Pasa una fecha a texto aaaa-mm-dd con la hora local, sin usar toISOString que va en UTC
function aTextoFecha(d) {
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// 1. Fecha mínima: mañana
const manana = new Date();
manana.setDate(manana.getDate() + 1);
fecha.min = aTextoFecha(manana);

// 2. Domingos cerrados
function comprobarFecha() {
  fecha.setCustomValidity('');                 // limpio el error anterior
  if (!fecha.value) return;                    // si está vacío ya lo controla required

  const [a, m, d] = fecha.value.split('-').map(Number);
  const elegida = new Date(a, m - 1, d);       // fecha local, no UTC

  if (elegida.getDay() === 0) {
    fecha.setCustomValidity('El taller cierra los domingos.');
  }
}
fecha.addEventListener('input', comprobarFecha);
fecha.addEventListener('change', comprobarFecha);

// 3. Cuenta opcional: el fieldset empieza con disabled
quieroCuenta.addEventListener('change', () => {
  cuenta.disabled = !quieroCuenta.checked;
  if (quieroCuenta.checked) {
    clave.focus();
  }
});

// 4. Las dos contraseñas tienen que coincidir
function comprobarClaves() {
  clave2.setCustomValidity(
    clave2.value && clave2.value !== clave.value ? 'Las contraseñas no coinciden.' : ''
  );
}
clave.addEventListener('input', comprobarClaves);
clave2.addEventListener('input', comprobarClaves);

// Contador de caracteres de la avería
function actualizarContador() {
  contador.textContent = `${averia.value.length} / 500 caracteres`;
}
averia.addEventListener('input', actualizarContador);
actualizarContador();

// Ampliación: la letra del DNI tiene que ser la correcta
function comprobarLetraDni() {
  dni.setCustomValidity('');
  // si no cumple el pattern dejo que salga el mensaje nativo
  if (!dni.value || dni.validity.patternMismatch) return;

  const numero = Number(dni.value.slice(0, 8));
  const letra = dni.value.slice(8).toUpperCase();
  const letraBuena = 'TRWAGMYFPDXBNJZSQVHLCKE'[numero % 23];

  if (letra !== letraBuena) {
    dni.setCustomValidity(`La letra no corresponde a ese número, debería ser ${letraBuena}.`);
  }
}
dni.addEventListener('input', comprobarLetraDni);

// Ampliación: campo trampa, si un bot lo rellena no se envía nada
form.addEventListener('submit', (evento) => {
  if (trampa.value !== '') {
    evento.preventDefault();
  }
});
