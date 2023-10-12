const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', executeSearch); // Search button

searchBar.addEventListener('keyup', function(event) { // Enter key
    if (event.key === 'Enter') {
        executeSearch();
    }
});

function executeSearch() {
    const searchTerm = searchBar.value.trim().toLowerCase();
    if (searchTerm) {
        const matchingPokemon = searchCache[searchTerm];

displayMatchingPokemon(matchingPokemon);
    } else {
        alert('Please enter a search term.');
    }
}

function searchCache(searchTerm) {
    return Object.values(cachedPokemonData).filter(pokemon => {
        pokemon.name.includes(searchTerm);
    });
}

function displayMatchingPokemon(matchingPokemon) {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';

    for (let pokemon of matchingPokemon) {
        const card = createPokemonCard(pokemon);
        cardsContainer.append(card);
    }
}
