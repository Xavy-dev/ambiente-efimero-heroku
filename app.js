/* ==========================================
   POKÉAPI
========================================== */

const formPokemon = document.getElementById("formPokemon");

formPokemon.addEventListener("submit", buscarPokemon);


function buscarPokemon(event) {

    // Evita que el formulario recargue la página
    event.preventDefault();


    const nombrePokemon =
        document
            .getElementById("pokemonBusqueda")
            .value
            .toLowerCase()
            .trim();


    const resultado =
        document.getElementById("resultadoPokemon");


    const url =
        `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;


    fetch(url)

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Pokémon no encontrado");
            }

            return respuesta.json();

        })

        .then(datos => {

            const tipos = datos.types
                .map(tipo => tipo.type.name)
                .join(", ");


            const habilidades = datos.abilities
                .map(habilidad => habilidad.ability.name)
                .join(", ");


            const tabla = `

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Altura</th>
                            <th>Peso</th>
                            <th>Tipo</th>
                            <th>Habilidades</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>${datos.id}</td>
                            <td>${datos.name}</td>
                            <td>${datos.height}</td>
                            <td>${datos.weight}</td>
                            <td>${tipos}</td>
                            <td>${habilidades}</td>
                        </tr>
                    </tbody>

                </table>

            `;


            resultado.innerHTML = tabla;

        })

        .catch(error => {

            console.error(error);

            resultado.innerHTML =
                '<p class="error">No se encontró el Pokémon solicitado.</p>';

        });

}



/* ==========================================
   OPEN-METEO
========================================== */

const formClima = document.getElementById("formClima");

formClima.addEventListener("submit", buscarClima);


function buscarClima(event) {

    // Evita que el formulario recargue la página
    event.preventDefault();


    const ciudad =
        document
            .getElementById("ciudadBusqueda")
            .value
            .trim();


    const resultado =
        document.getElementById("resultadoClima");


    /*
        Primero buscamos la ciudad utilizando
        la API de geocodificación.
    */

    const urlGeocoding =
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;


    fetch(urlGeocoding)

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error("Error al buscar la ciudad");
            }

            return respuesta.json();

        })

        .then(datosCiudad => {

            /*
                Si la API no devuelve resultados,
                significa que la ciudad no fue encontrada.
            */

            if (!datosCiudad.results ||
                datosCiudad.results.length === 0) {

                throw new Error("Ciudad no encontrada");

            }


            const ubicacion = datosCiudad.results[0];

            const latitud = ubicacion.latitude;
            const longitud = ubicacion.longitude;


            /*
                Con las coordenadas obtenidas
                consultamos el clima actual.
            */

            const urlClima =
                `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,wind_speed_10m&timezone=auto`;


            return fetch(urlClima)

                .then(respuesta => {

                    if (!respuesta.ok) {
                        throw new Error(
                            "Error al consultar el clima"
                        );
                    }

                    return respuesta.json();

                })

                .then(datosClima => {

                    const tabla = `

                        <table>

                            <thead>
                                <tr>
                                    <th>Ciudad</th>
                                    <th>Estado / Región</th>
                                    <th>País</th>
                                    <th>Temperatura</th>
                                    <th>Humedad</th>
                                    <th>Viento</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        ${ubicacion.name}
                                    </td>

                                    <td>
                                        ${ubicacion.admin1 || "No disponible"}
                                    </td>

                                    <td>
                                        ${ubicacion.country || "No disponible"}
                                    </td>

                                    <td>
                                        ${datosClima.current.temperature_2m}
                                        ${datosClima.current_units.temperature_2m}
                                    </td>

                                    <td>
                                        ${datosClima.current.relative_humidity_2m}
                                        ${datosClima.current_units.relative_humidity_2m}
                                    </td>

                                    <td>
                                        ${datosClima.current.wind_speed_10m}
                                        ${datosClima.current_units.wind_speed_10m}
                                    </td>
                                </tr>
                            </tbody>

                        </table>

                    `;


                    resultado.innerHTML = tabla;

                });

        })

        .catch(error => {

            console.error(error);

            resultado.innerHTML =
                '<p class="error">No se encontró información para esa ciudad.</p>';

        });

}



/* ==========================================
   DOG API
========================================== */

const formPerros = document.getElementById("formPerros");

formPerros.addEventListener("submit", buscarRaza);


function buscarRaza(event) {

    // Evita que el formulario recargue la página
    event.preventDefault();


    const busqueda =
        document
            .getElementById("razaBusqueda")
            .value
            .toLowerCase()
            .trim();


    const resultado =
        document.getElementById("resultadoPerros");


    const url =
        "https://dog.ceo/api/breeds/list/all";


    fetch(url)

        .then(respuesta => {

            if (!respuesta.ok) {
                throw new Error(
                    "Error al obtener las razas"
                );
            }

            return respuesta.json();

        })

        .then(datos => {

            /*
                Convertimos el objeto de razas
                en un arreglo.
            */

            const razas =
                Object.entries(datos.message);


            /*
                Filtramos las razas y subrazas
                que coincidan con el texto buscado.
            */

            const resultadosFiltrados = razas

                .map(([raza, subrazas]) => {

                    const subrazasFiltradas =
                        subrazas.filter(subraza =>
                            subraza.includes(busqueda)
                        );


                    /*
                        Si el nombre principal
                        de la raza coincide,
                        se incluyen todas sus subrazas.
                    */

                    if (raza.includes(busqueda)) {

                        return {
                            raza: raza,
                            subrazas: subrazas
                        };

                    }


                    /*
                        Si alguna subraza coincide,
                        solamente se incluyen
                        las subrazas encontradas.
                    */

                    if (subrazasFiltradas.length > 0) {

                        return {
                            raza: raza,
                            subrazas: subrazasFiltradas
                        };

                    }


                    return null;

                })

                .filter(item => item !== null);



            /*
                Si no hay coincidencias,
                mostramos un mensaje.
            */

            if (resultadosFiltrados.length === 0) {

                resultado.innerHTML =
                    '<p class="error">No se encontraron razas relacionadas con la búsqueda.</p>';

                return;

            }


            /*
                Creamos dinámicamente las filas
                de la tabla.
            */

            let filas = "";


            resultadosFiltrados.forEach(item => {

                const subrazas =
                    item.subrazas.length > 0
                        ? item.subrazas.join(", ")
                        : "Sin subrazas";


                filas += `

                    <tr>
                        <td>${item.raza}</td>
                        <td>${subrazas}</td>
                    </tr>

                `;

            });


            /*
                Construimos la tabla completa.
            */

            const tabla = `

                <table>

                    <thead>
                        <tr>
                            <th>Raza</th>
                            <th>Subrazas</th>
                        </tr>
                    </thead>

                    <tbody>
                        ${filas}
                    </tbody>

                </table>

            `;


            resultado.innerHTML = tabla;

        })

        .catch(error => {

            console.error(error);

            resultado.innerHTML =
                '<p class="error">No fue posible consultar las razas.</p>';

        });

}