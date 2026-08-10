const fs = require("fs");
const path = require("path");

//LESCTURA
var directorio = "../apartados/comics/en-nuestros-ultimos-dias/paneles/"
const carpetas = fs.readdirSync(directorio);
for (const carpeta of carpetas){
  numeroPanel = carpeta;
  //CHEQUEO SI YA FUE FORMATEADO
  if (fs.existsSync(directorio + "/" + numeroPanel + "/" + "listo")) {
    //loooooool
  }else{

    //PESTERLOG
    const markdown = fs.readFileSync(directorio + "/" + numeroPanel + "/" + "dialogo.md", "utf8");

    const bloques = markdown.split(/\n\s*\n/);

    var pesterlog = `<div class="pesterlog">`;

    for (const bloque of bloques) {
      const lineas = bloque.trim().split("\n");
      nombre = lineas[0];
      pesterlog += `\n` + `<span class = "${nombre}">` + `\n`;
      for (let i = 1; i < lineas.length; i++) {
        if (i === lineas.length - 1) {
          pesterlog += `${nombre}: ` + `${lineas[i]}` + `\n`;
        }else{
          pesterlog += `${nombre}: ` + `${lineas[i]}` + `<br>` + `\n`;
        }
      }
      pesterlog += `</span>` + `\n` + `<br>` + `\n`;
    }

    pesterlog += `\n` + `</div>`;

    //DESCRIPCION
    var descripcion = "";
    if (fs.existsSync(directorio + "/" + numeroPanel + "/" + "descripcion.md", "utf8")) {
      descripcion = fs.readFileSync(directorio + "/" + numeroPanel + "/" + "descripcion.md", "utf8");
    }

    //CONTENIDO
    var contenido = `
    <!DOCTYPE html>
    <html>

    <head>
      <title> pagina ${numeroPanel} </title>
      <meta charset="UTF-8">
      <link href="/apartados/css/panel.css" rel="stylesheet" type="text/css" media="all"> </head>
      <link href="/libreria.css" rel="stylesheet" type="text/css" media="all">
    <body>

      <div class="contenido">
        <h1> pagina ${numeroPanel} </h1>
        <img src="panel.gif" class="panel">
        <p>${descripcion}</p>
          ${pesterlog}
        <div class="controles">
            <a href="/apartados/comics/en-nuestros-ultimos-dias/paneles/${Number(numeroPanel) - 1}/index.html" class="control_izquierdo">&lt;==</a>
            <a href="/apartados/comics/en-nuestros-ultimos-dias/paneles/${Number(numeroPanel) + 1}/index.html" class="control_derecho">==&gt;</a>
        </div>
      </div>
      <script src="/scripts/modo-oscuro.js"></script>
    </body>

    </html>
    `

    var cosa = ""

    //ESCRITURA
    fs.writeFileSync(directorio + "/" + numeroPanel + "/" + "index.html", contenido);
    fs.writeFileSync(directorio + "/" + numeroPanel + "/" + "listo", cosa);
  }
}
