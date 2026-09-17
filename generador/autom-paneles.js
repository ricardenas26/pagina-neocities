const fs = require("fs");


// ==================================================
// LECTURA DEL MARKDOWN
// ==================================================

const markdown = fs.readFileSync("guion.md", "utf8");
const lineas = markdown.split("\n");


// ==================================================
// VARIABLES
// ==================================================

let comando1 = "";
let comando2 = "";

let paneles = 0;
let descripcion = "";
let dialogo = "";

let dialogo_banderita = false;

let pagina = false;
let num_pagina = 0;


// ==================================================
// CREAR PESTERLOG
// ==================================================

function crearPesterlog(texto) {

    const lineas = texto.trim().split("\n");

    let html = "";

    let personajeActual = "";
    let lineasPersonaje = [];


    function cerrarPersonaje() {

        if (lineasPersonaje.length === 0) {
            return;
        }

        html += `        <span class="${personajeActual}">\n`;

        for (let i = 0; i < lineasPersonaje.length; i++) {

            html += `          ${lineasPersonaje[i]}`;

            if (i < lineasPersonaje.length - 1) {
                html += "<br>";
            }

            html += "\n";
        }

        html += `        </span>\n`;
        html += `        <br>\n`;

        lineasPersonaje = [];
    }


    for (const linea of lineas) {

        if (linea.trim() === "") {
            continue;
        }


        // Busca:
        // PERSONAJE: dialogo

        const coincidencia = linea.match(/^([^:]+):\s*(.*)$/);


        if (!coincidencia) {
            continue;
        }


        const personaje = coincidencia[1].trim();
        const textoDialogo = coincidencia[2];


        // Cambió el personaje

        if (personaje !== personajeActual) {

            cerrarPersonaje();

            personajeActual = personaje;
        }


        lineasPersonaje.push(
            `${personaje}: ${textoDialogo}`
        );
    }


    cerrarPersonaje();


    return html;
}


// ==================================================
// CREAR UNA PÁGINA HTML
// ==================================================

function crearPagina() {


    // ----------------------------------------------
    // IMÁGENES
    // ----------------------------------------------

    let imagenes = "";


    for (let i = 0; i < paneles; i++) {

        let nombreImagen;


        // Primer panel
        // 0.gif
        // 1.gif
        // 2.gif

        if (i === 0) {

            nombreImagen = `${num_pagina}.gif`;

        }


        // Paneles siguientes
        // 0_0.gif
        // 0_1.gif
        // 0_2.gif

        else {

            nombreImagen = `${num_pagina}_${i - 1}.gif`;
        }


        imagenes += `    <img src="../paneles/${nombreImagen}" class="panel">\n`;
    }


    // ----------------------------------------------
    // PESTERLOG
    // ----------------------------------------------

    let pesterlog = "";


    // Solo crear el pesterlog si existe diálogo

    if (dialogo.trim() !== "") {

        pesterlog = `
    <div class="pesterlog">

${crearPesterlog(dialogo)}

    </div>
`;
    }


    // ----------------------------------------------
    // HTML
    // ----------------------------------------------

    const contenido = `<!DOCTYPE html>
<html>

<head>

    <title>Pagina ${num_pagina}</title>

    <link rel="icon"
          href="/recursos/imagenes/icono.png"
          type="image/png">

    <meta charset="UTF-8">

    <link href="/apartados/css/panel.css"
          rel="stylesheet"
          type="text/css"
          media="all">

    <link href="/libreria.css"
          rel="stylesheet"
          type="text/css"
          media="all">

</head>

<body>

  <div class="contenido">

    <h1>${comando1}</h1>

${imagenes}

    <p>${descripcion.trim().replace(/\n/g, "<br>\n")}</p>

${pesterlog}

    <div class="controles">
      <p>
        >
        <a href="${num_pagina + 1}.html">
            ${comando2}
        </a>
      </p>
    </div>
    <div class="controles2">
      <a href="0.html"> 
          Volver a Comenzar
      </a> |
      <a href="${num_pagina - 1}.html"> 
          Regresar
      </a>
    </div>

  </div>

  <script src="/scripts/modo-oscuro.js"></script>

</body>

</html>
`;


    // ----------------------------------------------
    // ESCRIBIR HTML
    // ----------------------------------------------

    fs.writeFileSync(
        `${num_pagina}.html`,
        contenido
    );
}


// ==================================================
// PROCESAR MARKDOWN
// ==================================================

for (const linea of lineas) {


    // ----------------------------------------------
    // NUEVA PÁGINA
    // ----------------------------------------------

    if (linea.startsWith("##")) {

        const comando = linea.slice(2).trim();


        // ------------------------------------------
        // Ya existe una página
        // ------------------------------------------

        if (pagina) {

            // Este comando es el comando2
            // de la página anterior

            comando2 = comando;


            // Crear página anterior

            crearPagina();


            // Limpiar contenido

            paneles = 0;

            descripcion = "";

            dialogo = "";


            // Aumentar número de página

            num_pagina++;
        }


        // ------------------------------------------
        // Primera página
        // ------------------------------------------

        else {

            pagina = true;

            num_pagina = 0;
        }


        // Este comando será el comando1
        // de la nueva página

        comando1 = comando;


        continue;
    }


    // ----------------------------------------------
    // PANEL
    // ----------------------------------------------

    if (linea.startsWith("!")) {

        paneles++;

        continue;
    }


    // ----------------------------------------------
    // DIÁLOGO
    // ----------------------------------------------

    if (linea.startsWith("```")) {

        dialogo_banderita = !dialogo_banderita;

        continue;
    }


    // ----------------------------------------------
    // TEXTO
    // ----------------------------------------------

    if (dialogo_banderita) {

        dialogo += linea + "\n";

    }

    else {

        descripcion += linea + "\n";
    }
}


// ==================================================
// CREAR LA ÚLTIMA PÁGINA
// ==================================================

if (pagina) {

    comando2 = "";

    crearPagina();
}
