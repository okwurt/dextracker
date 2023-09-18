let pokemonList = [];
let activeCollection = ""; // To track the currently active collection

const addPokemonBtn = document.getElementById('addPokemonBtn');
const addPokemonModal = document.getElementById('addPokemonModal');
const closeModalBtn = document.getElementById('closeModal');
const addPokemonForm = document.getElementById('addPokemonForm');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonNameDropdown = document.getElementById('pokemonNameDropdown');

// Fetch the Pokémon data from your JSON
fetch('data/pokemonData.json')
    .then(response => response.json())
    .then(data => {
        pokemonList = data;
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
    });

document.getElementById('pokemonSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    let filteredList = [];

    if (searchTerm) {
        filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    }

    displayResults(filteredList);
});

function displayResults(list) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';

    list.forEach(pokemon => {
        const listItem = document.createElement('li');

        const spriteImg = document.createElement('img');
        spriteImg.src = `https://raw.githubusercontent.com/okwurt/dextracker/main/sprites/icons/${pokemon.name.toLowerCase()}.png`;
        spriteImg.alt = pokemon.name + " sprite";
        spriteImg.width = 30;
        listItem.appendChild(spriteImg);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = pokemon.name;
        listItem.appendChild(nameSpan);

        listItem.addEventListener('click', function() {
            document.getElementById('pokemonSearch').value = pokemon.name;
            resultsList.innerHTML = '';
        });

        resultsList.appendChild(listItem);
    });
}

document.getElementById("addPokemonBtn").addEventListener("click", () => {
  addPokemonModal.style.display = "block";
});

closeModalBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addPokemonForm);
  const pokemonName = formData.get("pokemonName");

  if (activeCollection === "Origin Dex") {
    // Add to Origin Dex
  } else if (activeCollection === "Shiny Living Dex") {
    // Add to Shiny Living Dex
  }

  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

pokemonNameInput.addEventListener("input", () => {
  const inputValue = pokemonNameInput.value.toLowerCase();
  const suggestions = filterPokemonSuggestions(inputValue);

  pokemonNameDropdown.innerHTML = "";

  suggestions.forEach((suggestion) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.textContent = suggestion;
    suggestionItem.addEventListener("click", () => {
      pokemonNameInput.value = suggestion;
      pokemonNameDropdown.innerHTML = "";
    });
    pokemonNameDropdown.appendChild(suggestionItem);
  });
});

function filterPokemonSuggestions(input) {
  return pokemonList
    .filter((pokemon) => pokemon.name.toLowerCase().includes(input))
    .map((pokemon) => pokemon.name);
}

// Event listeners for collection links in the sidebar
document.querySelector("a[href='#Origin Dex']").addEventListener("click", () => {
  activeCollection = "Origin Dex";
  loadCollection("Origin Dex");
});

document.querySelector("a[href='#Shiny Living Dex']").addEventListener("click", () => {
  activeCollection = "Shiny Living Dex";
  loadCollection("Shiny Living Dex");
});

function loadCollection(collectionName) {
  const jsonPath = collectionName === "Origin Dex" ? "col/originDex.json" : "col/shinyLivingDex.json";
  fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
      const listContainer = document.getElementById('listContainer');
      const cardContainer = document.getElementById('cardContainer');
      listContainer.innerHTML = ''; // Clear previous content
      cardContainer.innerHTML = ''; // Clear previous content

      data.forEach(pokemon => {
        // Populate List View
        const listItem = document.createElement('div');
        listItem.className = 'pokemon-item';

        const spriteImgList = document.createElement('img');
        spriteImgList.src = `https://raw.githubusercontent.com/okwurt/dextracker/main/sprites/icons/${pokemon.name.toLowerCase()}.png`;
        spriteImgList.alt = pokemon.name + " sprite";
        spriteImgList.width = 50;
        listItem.appendChild(spriteImgList);

        const nameSpanList = document.createElement('span');
        nameSpanList.textContent = pokemon.name;
        listItem.appendChild(nameSpanList);

        listContainer.appendChild(listItem);

        // Populate Card View
        const cardItem = document.createElement('div');
        cardItem.className = 'pokemon-card';

        const spriteImgCard = document.createElement('img');
        spriteImgCard.src = spriteImgList.src;
        spriteImgCard.alt = spriteImgList.alt;
        spriteImgCard.width = 100;
        cardItem.appendChild(spriteImgCard);

        const nameSpanCard = document.createElement('h3');
        nameSpanCard.textContent = pokemon.name;
        cardItem.appendChild(nameSpanCard);

        cardContainer.appendChild(cardItem);
      });
    })
    .catch(error => {
      console.error("Error fetching collection data:", error);
    });
}

// Event listeners for view toggle buttons
document.getElementById("listViewBtn").addEventListener("click", () => {
  document.getElementById('listContainer').classList.add('active');
  document.getElementById('cardContainer').classList.remove('active');
  document.getElementById('listViewBtn').classList.add('active');
  document.getElementById('cardViewBtn').classList.remove('active');
});

document.getElementById("cardViewBtn").addEventListener("click", () => {
  document.getElementById('cardContainer').classList.add('active');
  document.getElementById('listContainer').classList.remove('active');
  document.getElementById('cardViewBtn').classList.add('active');
  document.getElementById('listViewBtn').classList.remove('active');
});
