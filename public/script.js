const boton = document.getElementById("btnSaludo");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", async () => {
  const response = await fetch("/api/saludo");
  const data = await response.json();

  resultado.innerHTML = data.mensaje;
});
