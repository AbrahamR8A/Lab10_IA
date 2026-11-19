function crearPecera(x){

    /*Se busca el contenedor que ya existe en el HTML*/
    const contenedor = document.getElementById("contenedor");

    /*Se limpia por si ya había una pecera (para que se pueda volver a llamar)*/
    contenedor.innerHTML = "";

    /*Se crea la pecera: una columna de filas sepradas por un gap pequeño
    * d-inline-flex flex-column -> las filas van una debajo de otra
    * gap-1 -> espacio entre filas (líneas blancas)
    * bg-white p-1 -> fondo blanco que se ve entre las celdas*/
    const pecera = document.createElement("div");
    pecera.id = "pecera";
    pecera.classList.add("d-inline-flex", "flex-column", "gap-1", "bg-white", "p-1");

    /*Doble bucle x filas, y en cada fila x celdas*/
    for(let f = 0; f < x; f++){
        const fila = document.createElement("div");
        fila.classList.add("d-flex", "gap-1");      // celdas una al lado de otra

        for (let c = 0; c < x; c++){
            const celda = document.createElement("div");

            // bg-info + bg-opacity-50 -> celeste claro
            // p-3 -> padding de 1rem por lado; un div vacío queda como un cuadrado de 32px
            celda.classList.add("bg-info", "bg-opacity-50", "p-3");
            fila.appendChild(celda);                // celda dentro de fila
        }

        pecera.appendChild(fila);                   // fila dentro de pecera
    }

    // se inserta en la página y se vuelve visible
    contenedor.appendChild(pecera);
}

// tablero de 6x6, como se puede ver en el enunciado
crearPecera(6);