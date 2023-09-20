// Variables
let pokemonList = [];
let currentCollection = [];
let selectedPokemonStaticData = null;

// DOM Elements
const addPokemonBtn = document.getElementById('addPokemonBtn');
const addPokemonModal = document.getElementById('addPokemonModal');
const closeModalBtn = document.getElementById('closeModal');
const addPokemonForm = document.getElementById('addPokemonForm');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonNameDropdown = document.getElementById('pokemonNameDropdown');
const addDetailsModal = document.getElementById('addDetailsModal');
const closeDetailsModalBtn = document.getElementById('closeDetailsModal');
const addDetailsForm = document.getElementById('addDetailsForm');
const moves = [
  formData.get("move1"),
  formData.get("move2"),
  formData.get("move3"),
  formData.get("move4")
].filter(move => move); // This filter will remove any empty strings, in case not all move fields are filled out.


// Fetch Pokémon data from JSON
fetch('data/pokemonData.json')
  .then(response => response.json())
  .then(data => {
    pokemonList = data;
  })
  .catch(error => {
    console.error("Error fetching Pokémon data:", error);
  });

// Event: Search Pokémon
document.getElementById('pokemonSearch').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  displayResults(filteredList);
});

// Function: Display Search Results
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

// Event: Open Add Pokémon Modal
document.getElementById("addPokemonBtn").addEventListener("click", () => {
  addPokemonModal.style.display = "block";
});

// Event: Close Add Pokémon Modal
closeModalBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

// Event: Select Pokémon from Dropdown in First Modal
pokemonNameDropdown.addEventListener("click", (e) => {
  const selectedPokemonName = e.target.textContent;
  const selectedPokemon = pokemonList.find(p => p.name === selectedPokemonName);
  if (selectedPokemon) {
    selectedPokemonStaticData = {
      id: selectedPokemon.id,
      name: selectedPokemon.name,
      species: selectedPokemon.species,
      type: selectedPokemon.type,
      height: selectedPokemon.height,
      weight: selectedPokemon.weight,
      abilities: selectedPokemon.abilities,
      eggGroups: selectedPokemon.eggGroups,
      baseStats: selectedPokemon.baseStats,
      evYield: selectedPokemon.evYield,
      forms: selectedPokemon.forms,
      preEvolutions: selectedPokemon.preEvolutions,
      evolutions: selectedPokemon.evolutions,
    };
    // Open the second modal for additional details
    addDetailsModal.style.display = "block";
  }
});

// Event: Submit Details in Second Modal
addDetailsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addDetailsForm);
  const pokemonNickname = formData.get("pokemonNickname");
  // ... (get other form data)
  const existingPokemonIndex = currentCollection.findIndex(p => p.id === selectedPokemonStaticData.id);
  if (existingPokemonIndex !== -1) {
    // Update existing Pokémon data
    currentCollection[existingPokemonIndex].nickname = pokemonNickname;
    // ... (update other properties)
  } else {
    // Merge static and user data and add to currentCollection
    const mergedPokemonData = {
      ...selectedPokemonStaticData,
      nickname: formData.get("pokemonNickname"),
      level: formData.get("pokemonLevel"),
      gender: formData.get("pokemonGender"),
      forme: formData.get("pokemonForme"),
      shiny: formData.get("pokemonShiny"),
      ability: formData.get("pokemonAbility"),
      nature: formData.get("pokemonNature"),
      moves: moves,
      iv: formData.get("pokemonIV"),
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
  // Close the modal
  addDetailsModal.style.display = "none";
  addDetailsForm.reset();
});

// Function: Display Merged Data
function displayMergedData() {
  // Logic to display the merged data (both static and user data) in the desired format
  // This could be in the form of a list, cards, or any other UI component
}

// ... (any other functions or event listeners you might have)

