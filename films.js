let currentPageUrl = "https://swapi.dev/api/films/";

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
      card.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(
        /\D/g,
        ""
      )}.jpg')`;
      card.className = "cards";

      const characterNameBG = document.createElement("div");
      characterNameBG.className = "character-name-bg";

      const characterName = document.createElement("span");
      characterName.className = "character-name";
      characterName.innerText = `${character.title}`;

      characterNameBG.appendChild(characterName);
      card.appendChild(characterNameBG);
      mainContent.appendChild(card);

      card.onclick = () => {
        const modal = document.getElementById("modal");
        modal.style.visibility = "visible";

        const modalContent = document.getElementById("modal-content");
        modalContent.innerHTML = "";

        const characterImage = document.createElement("div");
        characterImage.style.backgroundImage = `url('https://starwars-visualguide.com/assets/img/films/${character.url.replace(
          /\D/g,
          ""
        )}.jpg')`;
        characterImage.className = "character-image";

        const name = document.createElement("span");
        name.className = "character-details";
        name.innerText = `Nome: ${character.title}`;

        const release_date = document.createElement("span");
        release_date.className = "character-details";
        release_date.innerText = `Data de lançamento: ${character.release_date}`;

        const episode_id = document.createElement("span");
        episode_id.className = "character-details";
        episode_id.innerText = `Episódio: ${character.episode_id}`;

        const director = document.createElement("span");
        director.className = "character-details";
        director.innerText = `Direção: ${character.director}`;

        const producer = document.createElement("span");
        producer.className = "character-details";
        producer.innerText = `Produção: ${character.producer}`;

        const opening_crawl = document.createElement("span");
        opening_crawl.className = "character-details";
        opening_crawl.innerText = `Sinópse: ${character.opening_crawl}`;

        modalContent.appendChild(characterImage);
        modalContent.appendChild(name);
        modalContent.appendChild(release_date);
        modalContent.appendChild(episode_id);
        modalContent.appendChild(director);
        modalContent.appendChild(producer);
        modalContent.appendChild(opening_crawl);
      };
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
    alert("Erro ao carregar os filmes");
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
