

// zona superior donde aparecen las burbujas
const zonaBurbujas = document.createElement("div");
// position-absolute top-0 -> pegada a la parte superior de la pecera
// d-flex flex-wrap gap-1 -> burbujas una al lado de otra


zonaBurbujas.classList.add("position-absolute", "top-0", "start-0", "w-100", "d-flex", "flex-wrap", "gap-1", "p-2");
contenedor.appendChild(zonaBurbujas);   // "contenedor" ya existe desde p2.js

let numeroBurbuja = 0;          // para darle un id único a cada burbuja
const MAX_BURBUJAS = 12;        // límite para que no se llene la pecera

// crea una burbuja cada 2 segundos
function crearBurbuja() {
    // Si llegan al maximo, no se crean más
    if (zonaBurbujas.children.length >= MAX_BURBUJAS) return;

    // se elige al azar si es de Nemo o de Dory
    const esDeNemo = Math.random() < 0.5;

    const burbuja = document.createElement("div");
    numeroBurbuja++;
    burbuja.id = "burbuja-" + numeroBurbuja;
    burbuja.dataset.pez = esDeNemo ? "nemo" : "dory";   // -> data-pez="nemo"
    burbuja.draggable = true;                           // importante pues la hace arrastrable

    // Círculo con Bootstrap: p-3 + rounded-circle
    // bg-warning = naranja (Nemo), bg-primary = azul (Dory)
    burbuja.classList.add("p-3", "rounded-circle", "border", "border-white", "shadow-sm",
        esDeNemo ? "bg-warning" : "bg-primary");

    // dragstart para guardar el id de la burbuja en el dataTransfer
    burbuja.addEventListener("dragstart", (evento) => {
        evento.dataTransfer.setData("text/plain", burbuja.id);
    });

    zonaBurbujas.appendChild(burbuja);
}

setInterval(crearBurbuja, 2000);   // cada 2 segundos

// convierte a cada pez en zona de soltado
function prepararZonaPez(idPez, funcionSumar) {
    const pez = document.getElementById(idPez);

    // dragover: por defecto el navegador no permite soltar.
    // preventDefault() le dice "aquí sí se puede soltar".
    pez.addEventListener("dragover", (evento) => {
        evento.preventDefault();
    });

    // drop: se ejecuta al soltar la burbuja sobre el pez
    pez.addEventListener("drop", (evento) => {
        evento.preventDefault();

        // se recupera el id que se guarda en dragstart
        const idBurbuja = evento.dataTransfer.getData("text/plain");
        const burbuja = document.getElementById(idBurbuja);
        if (!burbuja) return;               // por si se arrastró otra cosa (texto, imagen, etc.)

        if (burbuja.dataset.pez === idPez) {
            // si es correcto se suma (con su storage de la P2) y la burbuja desaparece
            funcionSumar();
            burbuja.remove();
        }
        //si no es correcto no hacemos nada. La burbuja nunca salió de la zona
        // superior, así que visualmente "vuelve" a su posición inicial.
    });
}

// funciones definidas en p2.js
prepararZonaPez("nemo", sumarNemo);
prepararZonaPez("dory", sumarDory);