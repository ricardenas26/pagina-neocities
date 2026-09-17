const menu = document.createElement("div");
menu.id = "menu";
menu.innerHTML = `
  <p style="font-size: 19px;"> <a href="/index.html">menu</a> |
    <a href="/apartados/discos/index.html">discos</a> |
    <a href="/apartados/peliculas/index.html">peliculas</a> |
    <a href="/apartados/libros/index.html">libros</a> |
    <a href="/apartados/imagenes/index.html">imagenes</a> |
    <a href="/apartados/blog/index.html">blog</a> |
    <a href="/apartados/diario/index.html">diario</a> |
    <a href="/apartados/comics/index.html">comics</a> |
    <a href="/apartados/links/index.html">links</a>
  </p>
`;
document.body.prepend(menu);

const btn = document.createElement("button");
btn.id = "boton-modo";
document.body.prepend(btn);

if (localStorage.getItem("modo-oscuro") === "true") {
    document.documentElement.classList.add("cambiar-modo");
}

btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("cambiar-modo");

    const activo = document.documentElement.classList.contains("cambiar-modo");
    localStorage.setItem("modo-oscuro", activo);
});
