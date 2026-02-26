const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');

let ubicacion = '../apartados/discos/post/deseo_carne_y_voluntad';

const archivo = fs.readFileSync(ubicacion + '/reseña.md', 'utf8');
const parsed = matter(archivo);

const metadata = parsed.data;
const contenidoMd = parsed.content;
const contenidoHtml = marked(contenidoMd)

function crear_html(titulo, fecha, contenido) {
  contenido_archio = `
<!DOCTYPE html>
<html>

<head>
  <title> ${titulo} </title>
  <meta charset="UTF-8">
  <link href="/style.css" rel="stylesheet" type="text/css" media="all">
</head>
<body>

  <div class="contenido">
    <img src="portada.jpg">
    <h1> ${titulo} </h1>
    <h2> ${fecha} </h2>
    ${contenido}
  </div>
</body>

</html>
`;

  fs.writeFile(ubicacion + '/index.html', contenido_archio, (err) => {
    if (err) throw err;
    console.log('si');
  })
}

crear_html(metadata.titulo, metadata.fecha, contenidoHtml);
