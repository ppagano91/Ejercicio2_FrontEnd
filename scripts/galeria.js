// aqui guardamos los elementos HTML como constantes de JS para acceder a ellos desde el codigo
//Botones
const btnBuscar = document.getElementById("btnBuscar");
const btnBuscarTodos = document.getElementById("btnBuscarTodos");

//Propiedades de los Pokemones
const pokemonName = document.getElementById("pokemonName");
const pokemonId = document.getElementById("pokemonId");
const pokemonImg = document.getElementById("pokemonImg");

//
const pokemonForm = document.getElementById("pokemonForm");
const pokemonInput = document.getElementById("pokemonInput");
const pokemonInfo = document.getElementById("pokemonInfo");
const pokemonList = document.getElementById("pokemonList");

// aqui creamos una funcion que reciba un 'tipo de elemento' y un 'contenido' para crear un elemento de ese tipo y con ese contenido como texto interno, y que devuelva el elemento en cuestion
const createTag = (elementType, texto) => {
  let etiqueta = document.createElement(elementType);
  etiqueta.innerText = texto;
  return etiqueta;
};

const addImg = (image) => {
  let etiqueta = document.createElement("img");
  etiqueta.src = image;
  return etiqueta;
};

// aqui definimos simplemente las dos variables a reutilizar luego al llenar con datos
let pokemonListData = [];
let selectedPokemon;

// guardamos nuestra URL como una constante para claridad de codigo
const pokemonUrl1 = "https://pokeapi.co/api/v2/pokemon";
const pokemonUrl2 = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";

// nuestra primera funcion de obtencion de datos, donde pedimos los primeros 20 pokemon (recordemos que a pesar de solo llamar a .../v2/pokemon en realidad se le agrega a esta peticion automaticamente un offset de 20 y un limite de 20: el offset seria cuantos elementos queremos 'saltarnos' y el limite la cantidad de elementos que queremos traer)
const getPokemonList = () => {
  fetch(pokemonUrl2)
    //Convertir los datos de la url en formato .JSON
    .then((res) => res.json())

    //Operaciones con los datos.json
    .then((data) => {
      console.log(data);
      pokemonListData = data.results.map((pokemon, id) => {
        return [`${id + 1}`, pokemon.name];
      });
      //   console.log(pokemonListData);
      // aqui creamos un elemento con el nombre de cada pokemon y lo insertamos en el elemento HTML correspondiente
      pokemonListData.forEach((pokemonData) => {
        // pokemonList.appendChild(addImg(pokemonData));
        pokemonList.appendChild(createTag("h5", `ID: ${pokemonData[0]}`));
        pokemonList.appendChild(createTag("h5", `Name: ${pokemonData[1]}`));
      });
    })
    .then(() => {
      pokemonList.classList.remove("hidden");
      pokemonInfo.classList.add("hidden");
    })
    // aqui el catch nos sirve por si ocurre algun error, poder imprimir en consola que ocurrio y poder depurar el codigo
    .catch((err) => console.log("ERROR: ", err));
};

// nuestra segunda funcion asincronica de obtencion de datos, esta vez pasandole un parametro para que haga una peticion mas especifica
const getPokemonById = (id) => {
  // primero nos aseguramos de que el elemento de info del pokemon seleccionado este oculto
  pokemonInfo.classList.add("hidden");
  console.log(pokemonInfo.classList.contains("hidden"));
  console.log("buscando...");

  // realizamos la peticion con el id especifico
  fetch(`${pokemonUrl1}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // aqui guardamos los datos del pokemon especifico, y los utilizamos para 'llenar' los elementos de HTML con estos datos
      selectedPokemon = data;
      console.log(selectedPokemon);

      // aqui utilizamos el nombre que nos llega en minusculas y usando los metodos que conocemos de arrays, podemos lograr que la primer letra sea mayusculas ya que JS no tiene un metodo para tal fin

      // let name = selectedPokemon.name.toLowerCase().split("");
      // name.splice(0, 1, name[0].toUpperCase());
      // pokemonName.innerText = name.join("");

      let name = selectedPokemon.name;
      pokemonName.innerText = name;

      // Otra forma de lograr lo mismo podria ser utilizando lo siguiente
      // pokemonName.innerText =
      //   selectedPokemon.name.charAt(0).toUpperCase() +
      //   selectedPokemon.name.toLowerCase().slice(1);
      pokemonId.innerText = selectedPokemon.id;

      // aqui reseteamos la imagen para que no nos muestre la del pokemon anterior antes de cargar la nueva
      pokemonImg.src = "";
      pokemonImg.src = selectedPokemon.sprites.front_default;
    })
    .then(() => {
      // finalmente mostramos nuevamente el elemento de info del pokemon seleccionado
      pokemonList.classList.add("hidden");
      pokemonInfo.classList.remove("hidden");
    })
    // en caso de error, mostramos el error por consola y ademas avisamos al usuario del fallo
    .catch((err) => {
      console.error(err);
      alert("Lo siento, no pudimos encontrar ese pokemon!");
    });
};

// ocultamos la info al iniciar la app
pokemonInfo.classList.add("hidden");

// aqui unimos el evento del click del buscar con la funcion correspondiente
btnBuscar.addEventListener("click", () => {
  getPokemonById(pokemonInput.value);
});

// aqui manejamos el submit del formulario y limpiamos el mismo
pokemonForm.addEventListener("submit", (e) => {
  e.preventDefault();
  btnBuscar.click();
  pokemonForm.reset();
});
