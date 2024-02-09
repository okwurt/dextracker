let searchInput = document.getElementById('pokemonSearch');

searchInput.addEventListener('input', filterPokemon);

function filterPokemon() {
  let searchTerm = searchInput.value.toLowerCase();
  
  let filteredResults = pokemonData.filter(p => {
    return p.name.toLowerCase().includes(searchTerm); 
  });
  
  displayPokemon(filteredResults);
}

