export async function fetchPokemonDataByName(name) {
  try {
    const response = await fetch('data/pokemonData.json');
    const allPokemonData = await response.json();
    return allPokemonData.find(pokemon => pokemon.name.toLowerCase === name.toLowerCase());
  } catch (error) {
    console.error('Error fetching Pokemon data', error);
  }
}

export async function loadStaticData () {
    try {
        const response = await fetch('data/pokemonData.json');
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        const allPokemonData = await response.json();
        return allPokemonData;
    } catch (error) {
        console.error('Error fetching Pokemon data', error);
        return null || [];
    }
}

export function renderPokemonDetails(pokemonData) {
    if (!pokemonData) return;

    const pokemonDetailsContainer = document.getElementById('pokemonDetails');
    const pokemonNameElement = pokemonDetailsContainer.querySelector('.name');
    const pokemonImageElement = pokemonDetailsContainer.querySelector('.image');

    pokemonNameElement.textContent = pokemonData.name;
    pokemonImageElement.src = `sprites/weekly/pokemon/${pokemonData.name.toLowerCase()}.png`;
}

export function filterPokemonByType (allPokemonData, type) {
  return allPokemonData.filter(pokemon => pokemon.types.includes(type));
}

document.getElementById('pokemonNames').addEventListener('input', async (event) => {
    const selectedName = event.target.value;
    const selectedPokemonData = await fetchPokemonDataByName(selectedName);
    
    renderPokemonDetails(selectedPokemonData);
});