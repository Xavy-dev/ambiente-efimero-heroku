const { filtrarPorTexto } = require("../js/filtros");

const datos = [
  { nombre: "Ana", ciudad: "Guadalajara" },
  { nombre: "Carlos", ciudad: "Monterrey" },
  { nombre: "Daniela", ciudad: "Guadalajara" },
];

describe("Pruebas de la función filtrarPorTexto", () => {
  test("debe filtrar registros por ciudad", () => {
    const resultado = filtrarPorTexto(datos, "Guadalajara");

    expect(resultado).toHaveLength(2);
    expect(resultado[0].nombre).toBe("Ana");
    expect(resultado[1].nombre).toBe("Daniela");
  });

  test("debe ignorar mayúsculas y minúsculas", () => {
    const resultado = filtrarPorTexto(datos, "guadalajara");

    expect(resultado).toHaveLength(2);
  });

  test("debe devolver todos los registros cuando la búsqueda está vacía", () => {
    const resultado = filtrarPorTexto(datos, "");

    expect(resultado).toEqual(datos);
  });

  test("debe devolver un arreglo vacío cuando los datos no son válidos", () => {
    const resultado = filtrarPorTexto(null, "Ana");

    expect(resultado).toEqual([]);
  });

  test("debe devolver un arreglo vacío cuando no encuentra coincidencias", () => {
    const resultado = filtrarPorTexto(datos, "Puebla");

    expect(resultado).toEqual([]);
  });
});
