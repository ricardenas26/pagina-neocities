const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');

function generarPreview(Contenidohtml) {
  const textoPlano = Contenidohtml.replace(/<[^>]+>/g, '');

  const palabras = textoPlano.split(/\s+/);

  const recorte = palabras.slice(0, 100).join(' ');

  return `<p>${recorte}...</p>`;
}

function agregarse_al_index(apartado, titulo, preview_contenido) {
  const index = fs.readFileSync('../apartados/' + apartado + '/index.html', 'utf8');
  let lineas = index.split('\n');
  const posteo = `
    <div class="entrada" id="${titulo}">
      <h1> <a href="posteos/${titulo}/index.html"> ${titulo} </a> </h1>
      ${preview_contenido}
    </div>
`;
  lineas[11] += posteo;
  fs.writeFileSync('../apartados/' + apartado + '/index.html', lineas.join('\n'));
}

function crear_html(ubicacion, apartado) {
  const md = fs.readFileSync(ubicacion + '/entrada.md', 'utf8');
  const parsed = matter(md);

  const datos = parsed.data;
  const contenidoMd = parsed.content;
  const contenidoHtml = marked(contenidoMd);

  const titulo = datos.titulo;
  const fecha = datos.fecha;
  const contenido = contenidoHtml;

  if(apartado == 'blog/'){
    const contenidoArchivo = `
<!DOCTYPE html>
<html>

<head>
  <title> ${titulo} </title>
  <meta charset="UTF-8">
  <link href="../style.css" rel="stylesheet" type="text/css" media="all"> </head>
<body>

  <div class="contenido">
    <h1> ${titulo} </h1>
    <h2> ${fecha} </h2>
    ${contenido}
  </div>
</body>

</html>
`;
}if(apartado == 'diario/'){
    const contenidoArchivo = `
<!DOCTYPE html>
<html>

<head>
  <title> ${titulo} </title>
  <meta charset="UTF-8">
  <link href="../style.css" rel="stylesheet" type="text/css" media="all"> </head>
<body>

  <div class="contenido">
    <h1> ${titulo} </h1>
    ${contenido}
  </div>
</body>

</html>
`;
}

  fs.writeFile(ubicacion + '/index.html', contenidoArchivo, (err) => {
    if (err) throw err;
    console.log('html creado en ' + ubicacion);
  })

  const preview = generarPreview(contenidoHtml);
  agregarse_al_index(apartado, titulo, preview);
}

const raiz = '../apartados/';
const apartados = ['blog/', 'diario/'];

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
    }
  }
}
