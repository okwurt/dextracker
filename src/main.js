// Collections
const originDex = "Origin Dex";
const shinyLivingDex = "Shiny Living Dex";
const originDexFile = "data/originDex.json";
const shinyLivingDexFile = "data/shinyLivingDex.json";

// Variables
let pokemonList = [];
let currentCollectionName = [originDex, shinyLivingDex];
let currentCollection = [originDexFile, shinyLivingDexFile];
let selectedPokemonStaticData = null;

// Constants
const addPokemonBtn = document.getElementById('addPokemonBtn');
const addPokemonModal = document.getElementById('addPokemonModal');
const closeModalBtn = document.getElementById('addPokemonCloseBtn');
const addPokemonForm = document.getElementById('addPokemonForm');
const pokemonNameInput = document.getElementById('pokemonName');
const addDetailsModal = document.getElementById('addDetailsModal');
const closeDetailsModalBtn = document.getElementById('closeDetailsModal');
const addDetailsForm = document.getElementById('addDetailsForm');
const nextBtn = document.getElementById("nextBtn");

// Get all the links in the sidebar
const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

// Add a click event listener to each link
sidebarLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault(); // Prevent the default link behavior

    // Get the id of the section to show
    const sectionId = link.dataset.section;

    // Get all the sections on the page
    const sections = document.querySelectorAll('.content > section');

    // Hide all the sections except the one with the matching id
    sections.forEach(section => {
      if (section.id === sectionId) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
  });
});

// Open the Add Pokemon modal when the user clicks the button
addPokemonBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "block";
});

// Hide the Add Pokemon modal when the user clicks the close button or outside the modal
addPokemonCloseBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target == addPokemonModal) {
    addPokemonModal.style.display = "none";
  }
});

// When the user selects a Pokemon from the dropdown, store its static data and open the details modal
document.addEventListener("DOMContentLoaded", () => {
  const pokemonNameDropdown = document.getElementById("pokemonNameDropdown");

  pokemonNameDropdown.addEventListener("click", (e) => {
    const selectedPokemonName = e.target.textContent;
    const selectedPokemon = pokemonList.find(p => p.name === selectedPokemonName);
    if (selectedPokemon) {
      selectedPokemonStaticData = { ...selectedPokemon };
      addDetailsModal.style.display = "block";
    }
  });
});

// When the user submits the Add Pokemon form, save the form data to local storage and reset the form
addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault();

  localStorage.setItem("formData", JSON.stringify(Object.fromEntries(formData.entries())));

  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

// Event listener for "Next" button in first modal
nextBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
  addDetailsModal.style.display = "block";
});

// Event listener for "Submit" button in second modal
addDetailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addDetailsForm);
  const pokemonNickname = formData.get("pokemonNickname");
  const existingPokemonIndex = currentCollection.findIndex(p => p.id === selectedPokemonStaticData.id);
  if (existingPokemonIndex !== -1) {
    // Update existing Pokémon data
    currentCollection[existingPokemonIndex].nickname = pokemonNickname;
  } else {
    // Merge static and user data and add to currentCollection
    const mergedPokemonData = {
      ...selectedPokemonStaticData,
      nickname: formData.get("pokemonNickname"),
      level: formData.get("pokemonLevel"),
      gender: formData.get("pokemonGender"),
      forme: formData.get("pokemonFormNames"),
      shiny: formData.get("pokemonShiny"),
      ability: formData.get("pokemonAbilities"),
      nature: formData.get("pokemonNature"),
      moves: formData.getAll("pokemonMoves[]").filter(move => move),
      ivs: {
        hp: formData.get("hpIV"),
        atk: formData.get("atkIV"),
        def: formData.get("defIV"),
        spatk: formData.get("spatkIV"),
        spdef: formData.get("spdefIV"),
        spe: formData.get("speIV")
      },
      game: formData.get("pokemonGame"),
      location: formData.get("pokemonLocation"),
      ball: formData.get("pokemonBall"),
    };
    currentCollection.push(mergedPokemonData);
  }
  // Clear the temporary variable
  selectedPokemonStaticData = null;
  // Update merged data and display
  displayMergedData();
  // Close the modal and reset the form
  addDetailsModal.style.display = "none";
  addDetailsForm.reset();
});

// Function to display merged data
function displayMergedData() {
  // Logic to display the merged data (both static and user data) in the desired format
}

// Event listener for "Submit" button in first modal
addPokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addPokemonForm);
  const pokemonSpecies = formData.get("species");
  const pokemonLevel = formData.get("pokemonLevel");
  const pokemonImage = formData.get("pokemonImage");
  const pokemonTypes = formData.get("pokemonType1");
  const pokemonId = generatePokemonId();
  const pokemonData = {
    id: pokemonId,
    species: pokemonSpecies,
    level: pokemonLevel,
    image: pokemonImage,
    type1: pokemonType1,
    type2: pokemonType2
  };
  selectedPokemonStaticData = pokemonData;
  addPokemonModal.style.display = "none";
  addDetailsModal.style.display = "block";
});

// Fetch Pokemon data from JSON file and populate datalist with Pokemon names
fetch("data/pokemonData.json")
  .then(response => response.json())
  .then(pokemonData => {
    const pokemonNames = document.getElementById("pokemonNames");
    pokemonData.forEach(pokemon => {
      const option = document.createElement("option");
      option.value = pokemon.name;
      pokemonNames.appendChild(option);
    });
  })
  .catch(error => {
    console.error("Error fetching Pokémon data:", error);
  });

// Fetch form data from JSON file and populate datalists with form names and abilities
fetch("data/formData.json")
  .then(response => response.json())
  .then(formData => {
    const formNames = document.getElementById("pokemonFormNames");
    const abilities = document.getElementById("pokemonAbilities");
    formData.forEach(form => {
      const option = document.createElement("option");
      option.value = form.formName;
      formNames.appendChild(option);
      form.abilities.forEach(ability => {
        const abilityOption = document.createElement("option");
        abilityOption.value = ability;
        abilities.appendChild(abilityOption);
      });
    });
  })
  .catch(error => {
    console.error("Error fetching form data:", error);
  });

// Retrieve form data from local storage
const formData = JSON.parse(localStorage.getItem("formData"));

// Add a new Pokemon to the collection, save the collection, and display the updated collection
currentCollection.push(pokemon);
saveCollection();
displayPokemonCollection();

// Display the Pokemon collection in the UI
function displayPokemonCollection() {
  const pokemonCollection = document.getElementById("pokemonCollection");
  pokemonCollection.innerHTML = ""; // Clear existing collection

  currentCollection.forEach(pokemon => {
    const pokemonCard = document.createElement("div");
    pokemonCard.classList.add("pokemon-card");

    const pokemonName = document.createElement("h2");
    pokemonName.textContent = pokemon.nickname || pokemon.name;

    const pokemonImage = document.createElement("img");
    pokemonImage.src = `https://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`;

    const pokemonDetails = document.createElement("ul");
    pokemonDetails.innerHTML = `
      <li><strong>Level:</strong> ${pokemon.level}</li>
      <li><strong>Gender:</strong> ${pokemon.gender}</li>
      <li><strong>Forme:</strong> ${pokemon.forme}</li>
      <li><strong>Shiny:</strong> ${pokemon.shiny}</li>
      <li><strong>Ability:</strong> ${pokemon.ability}</li>
      <li><strong>Nature:</strong> ${pokemon.nature}</li>
      <li><strong>Moves:</strong> ${pokemon.moves.join(", ")}</li>
      <li><strong>IV:</strong> ${pokemon.iv}</li>
      <li><strong>Game:</strong> ${pokemon.game}</li>
      <li><strong>Location:</strong> ${pokemon.location}</li>
      <li><strong>Ball:</strong> ${pokemon.ball}</li>
    `;

    pokemonCard.appendChild(pokemonName);
    pokemonCard.appendChild(pokemonImage);
    pokemonCard.appendChild(pokemonDetails);
    pokemonCollection.appendChild(pokemonCard);
  });
}

const pokemon = {
  id: pokemonData.id,
  name: pokemonData.name,
  species: pokemonData.species,
  type: pokemonData.type,
  height: pokemonData.height,
  weight: pokemonData.weight,
  abilities: pokemonData.abilities,
  eggGroups: pokemonData.eggGroups,
  baseStats: pokemonData.baseStats,
  evYield: pokemonData.evYield,
  forms: pokemonData.forms,
  preEvolutions: pokemonData.preEvolutions,
  evolutions: pokemonData.evolutions
}; 

// Event listener for searching for a Pokemon
document.getElementById('pokemonSearch').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredList = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  displayResults(filteredList);
});

// Function to display search results
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

// Function to switch between different Pokemon collections
function switchCollection(newCollectionName) {
  // Save current collection to localStorage
  localStorage.setItem(currentCollectionName, JSON.stringify(currentCollection));

  // Load Origin Dex collection from JSON file
  fetch(originDexFile)
    .then(response => response.json())
    .then(data => {
      currentCollection = data || []; // Use empty array if data is null or undefined
      displayPokemonCollection();
    })
    .catch(error => {
      console.error(error);
      currentCollection = []; // Use empty array if there was an error loading the data
      displayPokemonCollection();
    });

  // Load Shiny Living Dex collection from JSON file
  fetch(shinyLivingDexFile)
    .then(response => response.json())
    .then(data => {
      currentCollection = data || []; // Use empty array if data is null or undefined
      displayPokemonCollection();
    })
    .catch(error => {
      console.error(error);
      currentCollection = []; // Use empty array if there was an error loading the data
      displayPokemonCollection();
    });
}
