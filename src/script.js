const collectionContainer = document.getElementById('collection-container');

// Fetch Pokémon collection data from GitHub and display cards
fetch('https://raw.githubusercontent.com/okwurt/dextracker/main/pokemon-collection.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(pokemon => {
      const card = createPokemonCard(pokemon);
      collectionContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching collection data:', error));

// Function to create a Pokémon card based on the data
function createPokemonCard(pokemonData) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="header">
      <span class="dex-number">${pokemonData.dexNumber}</span>
      <h2 class="pokemon-nickname">${pokemonData.nickname} <span class="gender-symbol">${pokemonData.genderSymbol}</span></h2>
    </div>
    <div class="image-container">
      <img src="sprites/games/home/shiny/${pokemonData.name.toLowerCase()}.png" alt="${pokemonData.name}">
    </div>
    <div class="attributes">
      <div class="attribute">
        <span class="label">Name</span>
        <span class="value">${pokemonData.name}</span>
      </div>
      <div class="attribute">
        <span class="label">Type</span>
        <span class="value type">${pokemonData.types.join(' | ')}</span>
      </div>
      <div class="attribute">
        <span class="label">Nature</span>
        <span class="value nature">${pokemonData.nature}</span>
      </div>
      <div class="attribute">
        <span class="label">Ability</span>
        <span class="value ability">${pokemonData.ability}</span>
      </div>
      <div class="attribute">
        <span class="label">Game</span>
        <span class="value game">${pokemonData.game}</span>
      </div>
      <div class="attribute">
        <span class="label">Location</span>
        <span class="value location">${pokemonData.location}</span>
      </div>
      <div class="attribute">
        <span class="label">Ball</span>
        <span class="value captureMethod">${pokemonData.captureMethod}</span>
      </div>
      <!-- Add more attributes as needed -->
    </div>
  `;
  return card;
}


// Display import sidebar when the import button is clicked
document.getElementById('import-button').addEventListener('click', function() {
  const importSidebar = document.getElementById('import-sidebar');
  importSidebar.classList.add('active');
});

// Function to handle form submission
const handleFormSubmit = (event) => {
  event.preventDefault();

  // Extract data from form inputs
  const dexNumber = document.getElementById('dex-number').value;
  const nickname = document.getElementById('nickname').value;
  const genderSymbol = document.getElementById('gender-symbol').value;
  const name = document.getElementById('pokemon-name').value;
  const types = document.getElementById('type').value.split(','); // Split types into an array
  const nature = document.getElementById('nature').value;
  const ability = document.getElementById('ability').value;
  const game = document.getElementById('game').value;
  const location = document.getElementById('location').value;
  const captureMethod = document.getElementById('captureMethod').value;

  // Extract other form inputs...

  console.log('Dex Number:', dexNumber);
  console.log('Nickname:', nickname);
  console.log('Gender:', genderSymbol);
  console.log('Name:', name);
  console.log('Type:', types);
  console.log('Nature:', nature);
  console.log('Ability:', ability);
  console.log('Game:', game);
  console.log('Location:', location);
  console.log('Ball:', captureMethod);

  // Create the Pokémon data object
  const importedData = {
    dexNumber,
    nickname,
    genderSymbol,
    name,
    types: types.split(', '), // Split the types string into an array
    nature,
    ability,
    game,
    location,
    captureMethod
    // ... Other attributes ...
  };

  // Call the importData function with the imported data
  importData(importedData);
};

function updateCollectionData(newData) {
  const url = 'https://github.com/okwurt/dextracker/blob/main/pokemon-collection.json'; // Replace with the actual URL of your JSON file
  const options = {
    method: 'PUT', // Use the appropriate HTTP method (PUT or PATCH)
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),
  };

  fetch(url, options)
    .then(response => response.json())
    .then(updatedData => {
      console.log('Collection data updated:', updatedData);
    })
    .catch(error => {
      console.error('Error updating collection data:', error);
    });
}

// Add a submit event listener to the form
const importForm = document.getElementById('import-form');
importForm.addEventListener('submit', handleFormSubmit);

// Function to add new Pokémon entry to collection data
function addPokemonToCollection(newPokemon) {
  // Fetch the current collection data
  fetch('https://raw.githubusercontent.com/okwurt/dextracker/main/pokemon-collection.json')
    .then(response => response.json())
    .then(data => {
      data.push(newPokemon); // Push the new Pokémon data to the array
      updateCollectionData(data); // Update the JSON file
    })
    .catch(error => console.error('Error fetching collection data:', error));
}

// Function to handle importing data
const importData = (importedData) => {
  addPokemonToCollection(importedData);

  // Generate and append a new card with the imported data
  const card = createPokemonCard(importedData);
  const collectionContainer = document.getElementById('collection-container');
  collectionContainer.appendChild(card);
};