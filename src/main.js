// Variables
let pokemonList = [];
let currentCollection = [];
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

// When the user clicks the Add Pokemon button, open the Add Pokemon modal
addPokemonBtn.addEventListener("click", () => {
  console.log("Add Pokemon button clicked");
  addPokemonModal.style.display = "block";
});

// When the user clicks the close button, hide the modal
addPokemonCloseBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
});

// When the user clicks outside the modal, hide the modal
window.addEventListener("click", (event) => {
  if (event.target == addPokemonModal) {
    addPokemonModal.style.display = "none";
  }
});

// Event: Select Pokémon from Dropdown in First Modal
document.addEventListener("DOMContentLoaded", () => {
  // Get the dropdown for selecting a Pokémon
  const pokemonNameDropdown = document.getElementById("pokemonNameDropdown");

  // Add an event listener to the dropdown
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
});

// Event: Submit Add Pokémon Form
addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent the form from submitting normally

  // Validate the form data
  const formData = new FormData(addPokemonForm);
  const errors = validateFormData(formData);
  if (errors.length > 0) {
    alert(errors.join("\n")); // display the validation errors
    return; // stop the form submission
  }

  // Save the form data to local storage
  localStorage.setItem("formData", JSON.stringify(Object.fromEntries(formData.entries())));

  // Hide the modal and reset the form
  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

// Function: Validate Form Data
function validateFormData(formData) {
  const errors = [];

  // Validate the nickname field
  const nickname = formData.get("pokemonNickname");
  }

  // Validate the level field
  const level = formData.get("pokemonLevel");
  if (!level) {
    errors.push("Level is required");
  } else if (isNaN(level) || level < 1 || level > 100) {
    errors.push("Level must be a number between 1 and 100");
  }

  // Validate other fields as needed
  return errors;
}

// When the user clicks the "Next" button, hide the first modal and show the second modal
nextBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
  addDetailsModal.style.display = "block";
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

// When the Add Pokemon form is submitted, get the form data
addPokemonForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(addPokemonForm);
  const moves = formData.getAll("move").filter(move => move);
  // ...
});

// Fetch Pokémon data from JSON
fetch('data/pokemonData.json')
  .then(response => response.json())
  .then(data => {
    pokemonList = data;
  })
  .catch(error => {
    console.error("Error fetching Pokémon data:", error);
  });

// Retrieve form data from local storage
const formData = JSON.parse(localStorage.getItem("formData"));

// Set form values from retrieved data
if (formData) {
  addPokemonForm.elements.namedItem("pokemonNickname").value = formData.pokemonNickname;
  addPokemonForm.elements.namedItem("pokemonLevel").value = formData.pokemonLevel;
  addPokemonForm.elements.namedItem("pokemonGender").value = formData.pokemonGender;
  addPokemonForm.elements.namedItem("pokemonForme").value = formData.pokemonForme;
  addPokemonForm.elements.namedItem("pokemonShiny").checked = formData.pokemonShiny;
  addPokemonForm.elements.namedItem("pokemonAbility").value = formData.pokemonAbility;
  addPokemonForm.elements.namedItem("pokemonNature").value = formData.pokemonNature;
  for (const [name, value] of formData.entries()) {
    const element = addPokemonForm.elements.namedItem(name);
    if (element) {
      if (element.type === "checkbox") {
        element.checked = value === "true";
      } else {
        element.value = value;
      }
    }
  }
}

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