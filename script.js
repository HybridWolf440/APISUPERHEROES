const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");

// modal
const modal = document.getElementById("modal");
const cerrar = document.getElementById("cerrar");

const titulo = document.getElementById("titulo");
const tituloOriginal = document.getElementById("tituloOriginal");
const director = document.getElementById("director");
const anio = document.getElementById("anio");
const descripcion = document.getElementById("descripcion");
const score = document.getElementById("score");

cerrar.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target == modal) modal.style.display = "none";
};

let peliculas = [];

// cargar datos
async function cargarPeliculas() {
  try {
    const res = await fetch("https://ghibliapi.vercel.app/films");
    peliculas = await res.json();
    mostrarPeliculas(peliculas);
  } catch (error) {
    console.error("Error:", error);
    contenedor.innerHTML = "<p>Error al cargar datos</p>";
  }
}

// mostrar tarjetas
function mostrarPeliculas(lista) {
  contenedor.innerHTML = "";

  lista.forEach((pelicula, index) => {

    const card = document.createElement("div");
    card.classList.add("card");

    const imagen = `https://picsum.photos/300/200?random=${index}`;

    // limitar a 226 caracteres
    const descripcionCorta = pelicula.description.length > 226
      ? pelicula.description.substring(0, 226) + "..."
      : pelicula.description;

    card.innerHTML = `
      <img src="${imagen}" alt="img">
      <h2>${pelicula.title}</h2>
      <p><em>${pelicula.original_title}</em></p>
      <p class="descripcion">${descripcionCorta}</p>
      <p>⭐ ${pelicula.rt_score}</p>
    `;

    card.addEventListener("click", () => {
      titulo.textContent = pelicula.title;
      tituloOriginal.textContent = pelicula.original_title;
      director.textContent = pelicula.director;
      anio.textContent = pelicula.release_date;
      descripcion.textContent = pelicula.description;
      score.textContent = pelicula.rt_score;

      modal.style.display = "block";
    });

    contenedor.appendChild(card);
  });
}

// buscador
buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();

  const filtradas = peliculas.filter(p =>
    p.title.toLowerCase().includes(texto)
  );

  mostrarPeliculas(filtradas);
});

// iniciar
cargarPeliculas();