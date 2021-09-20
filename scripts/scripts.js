//Variables
const sendBtn = document.querySelector("#sendBtn");
const contenedorPersonas = document.querySelector("#listado__container");
const form = document.querySelector("#form");

let data = {
  personas: [
    {
      nombre: "Patricio",
      apellido: "Pagano",
      correo: "pagano.patricio@gmail.com",
      edad: "30",
      pais: "Argentina",
    },
  ],
  mensajes: [],
};

//4 método .createElement() es para crear un elemento en, por ejemplo, el formulario dentro de Listado de Personas
// const contenedorPersonas = document.querySelector("#contenedorPersonas");

//3 Crear función handleSendBtn
const handleSendBtn = () => {
  // capturamos los datos del mormulario al hacer click en ENVIAR
  const nuevaPersona = {
    nombre: form.nombre.value,
    apellido: form.apellido.value,
    correo: form.correo.value,
    edad: form.edad.value,
    pais: form.pais.value,
    genero: form.genero.value,
  };

  // agregamos la nueva persona al objeto de datos
  data = { ...data, personas: [...data.personas, nuevaPersona] };

  // limpiamos el formulario
  form.reset();

  //pintamos el DOM con la nueva persona con la función addNewPerson
  addNewPerson(nuevaPersona);
};

// Crear la funcion addNewPerson para subdividir tareas a las funciones
const addNewPerson = (nuevaPersona) => {
  // Se crean los elementos que luego serán populados con las datos del form
  // y se agregan las clases para luego darle estilos
  // se crean los "lectores" del HTML para relacionarlos con una variable que podamos usar en JS
  const contenedorPersona = document.createElement("div");
  contenedorPersona.classList.add("listado__container--persona");
  const elementoNombre = document.createElement("h4");
  elementoNombre.classList.add("listado__container--nombre-persona");
  const elementoCorreo = document.createElement("h4");
  elementoCorreo.classList.add("listado__container--correo-persona");
  const elementoEdad = document.createElement("h4");
  elementoEdad.classList.add("listado__container--edad-persona");
  const elementoPais = document.createElement("h4");
  elementoPais.classList.add("listado__container--pais-persona");
  const elementoGenero = document.createElement("h4");
  elementoGenero.classList.add("listado__container--genero-persona");

  const lineaHorizontal = document.createElement("hr");

  //popular los elementos con los datos correspondientes
  elementoNombre.innerText = `Nombre Completo: ${nuevaPersona.nombre} ${nuevaPersona.apellido}`;
  elementoCorreo.innerText = `Email: ${nuevaPersona.correo}`;
  elementoEdad.innerText = `Edad: ${nuevaPersona.edad} años`;
  elementoPais.innerText = `Nacionalidad: ${nuevaPersona.pais}`;
  elementoGenero.innerText = `Genero: ${nuevaPersona.genero}`;

  // se añaden los elementos (con su información correspondiente) al contenedor creado a tal fin (el de cada persona),
  // y luego este elemento se agrega al contenedor general de personas
  contenedorPersona.appendChild(elementoNombre);
  contenedorPersona.appendChild(elementoCorreo);
  contenedorPersona.appendChild(elementoEdad);
  contenedorPersona.appendChild(elementoPais);
  contenedorPersona.appendChild(elementoGenero);
  // contenedorPersona.appendChild(lineaHorizontal);

  contenedorPersonas.appendChild(contenedorPersona);

  // console.log(data.personas);
};

// addEventListener(<evento>, <función>): para escuchar el "click" del "bóton" para recibir los datos del formulario
sendBtn.addEventListener("click", handleSendBtn);

let me = {
  nombre: "Patricio",
  apellido: "Pagano",
  correo: "pagano.patricio@gmail.com",
  edad: "30",
  pais: "Argentina",
  genero: "Masculino",
};

// addNewPerson(me);
// addNewPerson(me);
// addNewPerson(me);
// addNewPerson(me);
// addNewPerson(me);
