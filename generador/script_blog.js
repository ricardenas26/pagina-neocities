const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');

function agregarse_al_index(apartado, titulo) {
  const index = fs.readFileSync('../apartados/' + apartado + '/index.html', 'utf8');
  let lineas = index.split('\n');
  const posteo = `
    <div class="disco" id="${titulo}">
      <img src="posteos/${titulo}/portada.jpg">
      <h1> <a href="posteos/${titulo}/index.html"> ${titulo} </a> </h1>
      <p>hhola hola hola hola hola hola hola hola hola hol aola hola hola hola hola</p>
    </div>
`;
  lineas[10] += posteo;
  fs.writeFileSync('../apartados/' + apartado + '/index.html', lineas.join('\n'));
}

function crear_html(ubicacion, apartado) {
  const md = fs.readFileSync(ubicacion + '/reseña.md', 'utf8');
  const parsed = matter(md);

  const datos = parsed.data;
  const contenidoMd = parsed.content;
  const contenidoHtml = marked(contenidoMd);

  const titulo = datos.titulo;
  const banda = datos.banda;
  const fecha = datos.fecha;
  const contenido = contenidoHtml;

  const contenidoArchivo = `
<!DOCTYPE html>
<html>

<head>
  <title> ${titulo} </title>
  <meta charset="UTF-8">
  <link href="../style.css" rel="stylesheet" type="text/css" media="all"> </head>
<body>

  <div class="contenido">
    <img src="portada.jpg">
    <h1> ${titulo} </h1>
    <h2> ${banda} </h2>
    <h3> ${fecha} </h3>
    ${contenido}
  </div>
</body>

</html>
`;

  fs.writeFile(ubicacion + '/index.html', contenidoArchivo, (err) => {
    if (err) throw err;
    console.log('html creado en ' + ubicacion);
  })
}

const raiz = '../apartados/';
const apartados = ['discos/'];

for (const apartado of apartados) {
  let ubicacion = raiz + apartado + 'posteos/';

  const contenido = fs.readdirSync(ubicacion, { withFileTypes: true });
  const posteos = contenido
    .filter(entry => entry.isDirectory()) //filtramos solo los directorios
    .map(entry => entry.name);

  for (const posteo of posteos) {
    const contenido = fs.readdirSync(ubicacion + posteo + '/');
    if (!contenido.includes('index.html')) { //si no encuentra un html entonces lo crea
      crear_html(ubicacion + posteo + '/', apartado);
      agregarse_al_index(apartado, posteo);
    }
  }

}
