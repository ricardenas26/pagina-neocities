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
