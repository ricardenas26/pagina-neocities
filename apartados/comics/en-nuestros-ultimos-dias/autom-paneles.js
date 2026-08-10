const fs = require("fs");

const markdown = fs.readFileSync("./paneles/2/dialogo.md", "utf8");

const bloques = markdown.split(/\n\s*\n/);

var pesterlog = `
`

for (const bloque of bloques) {
  const lineas = bloque.split("\n");
  var linea1 = lineas[0];
  var lineasExtra;

  for (let i = 1; i < lineas.length; i++){
    var += lineas[i] + "/n";
  }

  pesterlog += ´
        <span class=${linea1}>
          ruben: dios que paso? 
        </span>
        <br>
  ´
}


        <span class="ruben">
          ruben: dios que paso? 
        </span>
        <br>

        <span class="ismael">
          ismael: me acaban de avisar que adrian se suicido
        </span>
        <br>

        <span class="ruben">
          ruben: que? enserio?
        </span>
        <br>

        <span class="ismael">
          ismael: si, me acaba de avisar su hermana
        </span>
        <br>


