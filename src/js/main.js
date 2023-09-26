// Import Functions
import { initialize } from "./initialize.js";
import { loadStaticData } from "./pokemonData.js";
import { setupEventListeners } from "./eventHandling.js";
import { renderPokemonCollection, displayMergedData, renderPokemonDetails, renderPokemonDetailsbyName, createPokemonCard } from "./uiRendering.js";
import { addOrUpdatePokemonToCollection, removePokemonFromCollection, loadCollection, saveCollection, switchCollection } from "./collectionManagement.js";

// Initialize
initialize();

async function fetchAllPokemonNames () {
  try {
    const response = await fetch('data/pokemonNames.json');
    const allPokemonNames = await response.json();
    return allPokemonNames.map(name => name.toLowerCase());
  } catch (error) {
    console.error('Error fetching Pokemon names:', error);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const pokemonNames = await fetchAllPokemonNames();
  const pokemonNameDropdown = document.getElementById('pokemonNames');
    pokemonNames.forEach(name => {
     const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
pokemonNameDropdown.appendChild(option);
    });
});

document.getElementById('pokemonNames').addEventListener('input', (event) => {
  const selectedName = event.target.value;
  const imageUrl = `data/pokemons_images/${selectedName.toLowerCase()}.png`;

  document.getElementById('pokemonImage').src = imageUrl;

  document.getElementById('pokemonImage').alt = selectedName;
});

document.getElementById('nextBtn').addEventListener('click', () => {

  document.getElementById('addPokemonModal').style.display = 'none';

  document.getElementById('addDetailsModal').style.display = 'block';
});