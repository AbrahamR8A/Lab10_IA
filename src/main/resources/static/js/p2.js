// Leer los contenedores guardados
// getItem devuelve un STRING o null si no existe
// Number(null) da 0, así que si es la primera vez el contador empieza en 0
let contadorNemo = Number(localStorage.getItem("contadorNemo"));
let contadorDory = Number(sessionStorage.getItem("contadorDory"));

// Crear la capa de los peces encima de la pecera
const contenedor = document.getElementById("contenedor");

const capaPeces = document.createElement("div");

// position-absolute + top-0 start-0 w-100 h-100 -> cubre toda la pecera
// d-flex justify-content-around align-items-center -> los 2 peces repartidos
capaPeces.classList.add("position-absolute", "top-0", "start-0", "w-100", "h-100", "d-flex", "justify-content-around",
                        "align-items-center");
contenedor.appendChild(capaPeces);

/*crearPez: arma la tarjeta de un pez (emojí, nombre, contenedor y botón)
* y la devuelve. Así no repetimos el mismo código para Nemo y Dory.*/
function crearPez(id, emoji, nombre, colorBoton, valorInicial){
    const pez = document.createElement("div");
    pez.id = id;                //"nemo" o "dory" es para la pregunta 3
    pez.classList.add("bg-white", "bg-opacity-75", "rounded", "p-2", "text-center", "shadow-sm");

    const icono = document.createElement("div");
    icono.classList.add("fs-1");
    icono.textContent = emoji;

    const titulo = document.createElement("div");
    titulo.classList.add("fw-bold");
    titulo.textContent = nombre;

    const contador = document.createElement("div");
    contador.id = "contador-" + id;
    contador.classList.add("fs-4");
    contador.textContent = valorInicial;

    const boton = document.createElement("button");
    boton.id = "boton-" + id;
    boton.classList.add("btn", "btn-sm", colorBoton);
    boton.textContent = "¡Vi un pez!";

    pez.append(icono, titulo, contador, boton);     // append acepta varios hijos
    return pez;
}

capaPeces.appendChild(crearPez("nemo", "🐠", "Nemo", "btn-warning", contadorNemo));
capaPeces.appendChild(crearPez("dory", "🐟", "Dory", "btn-primary", contadorDory));

// botones para sumar y guardar (las reutiliza también la P3)
function sumarNemo() {
    contadorNemo++;
    localStorage.setItem("contadorNemo", contadorNemo);      // persiste entre pestañas
    document.getElementById("contador-nemo").textContent = contadorNemo;
}

function sumarDory() {
    contadorDory++;
    sessionStorage.setItem("contadorDory", contadorDory);    // solo en la pestaña actual
    document.getElementById("contador-dory").textContent = contadorDory;
}

// Los botones llaman a esas funciones
document.getElementById("boton-nemo").addEventListener("click", sumarNemo);
document.getElementById("boton-dory").addEventListener("click", sumarDory);

// Ahora colocamos el agua de celeste a verde cada segundo
// No se guarda en storage, al recargar la página se vuelve celeste
const celdas = document.querySelectorAll("#pecera > div > div");    // Todas las celdas

//Quitamos las clases de color de boostrap, el color cambiará desde JS
celdas.forEach(celda => celda.classList.remove("bg-info", "bg-opacity-50"));

const AZUL = [173, 216, 230];
const VERDE = [0, 128, 0];
const SEGUNDOS_TOTALES = 30;
let segundos = 0;

function pintarAgua(){
    // t va de 0 (celeste) a 1 (verde)
    const t = Math.min(segundos / SEGUNDOS_TOTALES, 1);

    // Interpolación lineal de cada canal RGB
    const r = Math.round(AZUL[0] + (VERDE[0] - AZUL[0]) * t);
    const g = Math.round(AZUL[1] + (VERDE[1] - AZUL[1]) * t);
    const b = Math.round(AZUL[2] + (VERDE[2] - AZUL[2]) * t);
    celdas.forEach(celda => celda.style.backgroundColor = `rgb(${r}, ${g}, ${b})`);
}

pintarAgua();                           // color inicial: celeste
setInterval(() => {        // cada 1000 ms = 1 segundo
    segundos++;
    pintarAgua();
}, 1000);



