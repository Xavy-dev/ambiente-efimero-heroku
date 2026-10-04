var mensajeDepuracion = "Prueba de ESLint"

function filtrarPorTexto(datos, texto) {
  if (!Array.isArray(datos)) {
    return [];
  }

  if (!texto || texto.trim() === "") {
    return datos;
  }

  const busqueda = texto.trim().toLowerCase();

  return datos.filter((elemento) => {
    return Object.values(elemento).some((valor) =>
      String(valor).toLowerCase().includes(busqueda),
    );
  });
}

module.exports = { filtrarPorTexto };
