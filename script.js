const contenedor = document.getElementById("contenedor");
const buscador = document.getElementById("buscador");
const overlay = document.getElementById("overlay");

let heroes = [];

async function cargarHeroes() {
  const res = await fetch("https://akabab.github.io/superhero-api/api/all.json");
  heroes = await res.json();
  mostrarHeroes(heroes);
}

function mostrarHeroes(lista) {
  contenedor.innerHTML = "";

  lista.slice(0, 60).forEach((heroe) => {

    const card = document.createElement("div");

    const publisher = heroe.biography.publisher || "Desconocido";
    const clase = publisher === "Marvel Comics" ? "marvel" : "dc";

    card.classList.add("card", clase);

    const stats = heroe.powerstats;

    
    const nombreReal = heroe.biography.fullName || heroe.name;
    const alias = heroe.biography.aliases.slice(0, 2).join(", ");
    const ocupacion = heroe.work.occupation || "Sin ocupación";
    const raza = heroe.appearance.race || "Desconocida";

    const descripcion = `
${nombreReal}, también conocido como ${alias || "sin alias"}, 
es un personaje de ${publisher}. 
Su ocupación es ${ocupacion} y pertenece a la raza ${raza}.
`;

    card.innerHTML = `
      <div class="card-inner">

        <!-- FRENTE -->
        <div class="card-front">
          <div class="card-img">
            <img src="${heroe.images.sm}" alt="">
          </div>

          <div class="card-content">
            <h2>${heroe.name}</h2>
            <p class="descripcion">${ocupacion}</p>
          </div>
        </div>

        <!-- ATRÁS -->
        <div class="card-back">
          <h3>${heroe.name}</h3>

          <p>${descripcion}</p>

          <div class="stat">
            <span>Inteligencia</span>
            <div class="bar">
              <div class="fill ${clase}-fill" style="--valor:${stats.intelligence}%"></div>
            </div>
          </div>

          <div class="stat">
            <span>Fuerza</span>
            <div class="bar">
              <div class="fill ${clase}-fill" style="--valor:${stats.strength}%"></div>
            </div>
          </div>

          <div class="stat">
            <span>Poder</span>
            <div class="bar">
              <div class="fill ${clase}-fill" style="--valor:${stats.power}%"></div>
            </div>
          </div>

          <div class="stat">
            <span>Popularidad</span>
            <div class="bar">
              <div class="fill ${clase}-fill" style="--valor:${Math.floor(Math.random()*100)}%"></div>
            </div>
          </div>

        </div>

      </div>
    `;

    card.addEventListener("click", () => {

      const isFocused = card.classList.contains("focused");

      if (isFocused) {
        card.classList.remove("focused", "flipped");
        overlay.classList.remove("active");

        card.querySelectorAll(".fill").forEach(f => f.classList.remove("active"));
        return;
      }

      document.querySelectorAll(".card").forEach(c => {
        c.classList.remove("focused", "flipped");
        c.querySelectorAll(".fill").forEach(f => f.classList.remove("active"));
      });

      card.classList.add("focused", "flipped");
      overlay.classList.add("active");

      
      card.querySelectorAll(".fill").forEach(f => {
        f.classList.add("active");
      });

    });

    contenedor.appendChild(card);
  });
}

overlay.addEventListener("click", () => {
  document.querySelectorAll(".card").forEach(c => {
    c.classList.remove("focused", "flipped");
    c.querySelectorAll(".fill").forEach(f => f.classList.remove("active"));
  });
  overlay.classList.remove("active");
});

buscador.addEventListener("input", () => {
  const texto = buscador.value.toLowerCase();
  const filtradas = heroes.filter(h =>
    h.name.toLowerCase().includes(texto)
  );
  mostrarHeroes(filtradas);
});

cargarHeroes();
