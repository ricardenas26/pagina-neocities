const fs = require('fs');
const matter = require('gray-matter');
const { marked } = require('marked');

function agregarse_al_index(apartado, titulo, preview_contenido) {
  const index = fs.readFileSync('../apartados/' + apartado + '/index.html', 'utf8');
  let lineas = index.split('\n');
  const posteo = `
      <div class="entrada">
        ${preview_contenido}
        <img src="./posteos/${titulo}/imagen.png">
        <h2>${titulo}</h2>
      </div>
`;
  lineas[11] += posteo;
  fs.writeFileSync('../apartados/' + apartado + '/index.html', lineas.join('\n'));
}

const raiz = '../apartados/';
let ubicacion = raiz + 'imagenes/posteos/';

const contenido = fs.readdirSync(ubicacion, { withFileTypes: true });
const posteos = contenido
  .filter(entry => entry.isDirectory()) //filtramos solo los directorios
  .map(entry => entry.name);

for (const posteo of posteos) {
  const rutaListo = ubicacion + posteo + '/listo';
  if(!fs.existsSync(rutaListo)){
    const md = fs.readFileSync(ubicacion + posteo + '/entrada.md', 'utf8');
    const parsed = matter(md);
    const contenidoMd = parsed.content;
    const contenidoHtml = marked(contenidoMd);

    agregarse_al_index('imagenes', posteo, contenidoHtml);
    fs.writeFileSync(ubicacion + posteo + '/listo', 'ok');
  }
}


