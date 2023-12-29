let currentPageUrl = "https://swapi.dev/api/planets/";

window.onload = async () => {
  try {
    await loadCharacters(currentPageUrl);
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar cards");
  }

  const nextButton = document.getElementById("next-button");
  const backButton = document.getElementById("back-button");

  nextButton.addEventListener("click", loadNextPage);
  backButton.addEventListener("click", loadPreviousPage);
};

async function loadCharacters(url) {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    responseJson.results.forEach((character) => {
      const card = document.createElement("div");
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(
        /\D/g,
        ""
      )}.jpg')`;
      card.className = "cards";

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.name}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/planets/${character.url.replace(
          /\D/g,
          ""
        )}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.name}`;

        const rotation_period = document.createElement("span");
        rotation_period.className = "character-details";
        rotation_period.innerText = `Periodo Rotatorio: ${convertRotationPeriod(
          character.rotation_period
        )}`;

        const orbital_period = document.createElement("span");
        orbital_period.className = "character-details";
        orbital_period.innerText = `Periodo Orbital: ${convertorbitalPeriod(
          character.orbital_period
        )}`;

        const climate = document.createElement("span");
        climate.className = "character-details";
        climate.innerText = `Clima: ${convertClimate(character.climate)}`;

        const gravity = document.createElement("span");
        gravity.className = "character-details";
        gravity.innerText = `Gravidade: ${convertGravity(character.gravity)}`;

        const population = document.createElement("span");
        population.className = "character-details";
        population.innerText = `População: ${convertPopulation(
          character.population
        )}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(rotation_period);
        modalContent.appendChild(orbital_period);
        modalContent.appendChild(climate);
        modalContent.appendChild(gravity);
        modalContent.appendChild(population);
      };

      mainContent.appendChild(card);
    });

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.disabled = !responseJson.next;
    backButton.disabled = !responseJson.previous;

    backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
    nextButton.style.visibility = responseJson.next ? "visible" : "hidden";

    currentPageUrl = url;
  } catch (error) {
    console.log(error);
    alert("Erro ao carregar os planetas");
  }
}

async function loadNextPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.next);
  } catch (error) {
    console.log(error);
    alert("Erro au carregar a próxima página");
  }
}

async function loadPreviousPage() {
  if (!currentPageUrl) return;

  try {
    const response = await fetch(currentPageUrl);
    const responseJson = await response.json();

    await loadCharacters(responseJson.previous);
  } catch (error) {
    console.log(error);
    alert("Erro au carregar a página anterior");
  }
}

function hiddeModal() {
  const modal = document.getElementById("modal");
  modal.style.visibility = "hidden";
}

function convertRotationPeriod(rotation_period) {
  if (rotation_period === "unknown") {
    return "Desconhecido";
  }
  return `${rotation_period} Dias`;
}
function convertorbitalPeriod(orbital_period) {
  if (orbital_period === "unknown") {
    return "Desconhecido";
  }
  return `${orbital_period} Dias`;
}
function convertClimate(climate) {
  const climas = {
    desert: "Deserto",
    temperate: "Temperado",
    frozen: "Congelado",
    murky: "Obscuro",
    arid: "Arido",
    windy: "Ventoso",
    hot: "Quente",
    frigid: "Gelado",
    humid: "Humido",
    moist: "Humido",
    polluted: "Poluido",
    subartic: "Subartico",
    artic: "Artico",
    rocky: "Rochoso",
    superheated: "Superaquecido",
    artificial_temperate: "Temperado Artificial",
    unknown: "Desconhecido",
  };
  return climas[climate.toLowerCase()] || climate;
}
function convertGravity(gravity) {
  if (gravity === "unknown") {
    return "Desconhecida";
  }
  return gravity;
}
function convertPopulation(population) {
  if (population === "unknown") {
    return "Desconhecida";
  }
  return population;
}
