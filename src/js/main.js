function getPokemonData(pokemonName) {
    // First, fetch cached data from localStorage
    let cachedPokemonData = localStorage.getItem(pokemonName);
    if (cachedPokemonData && cachedPokemonData !== isCacheExpired(cachedPokemonData.timestamp)) {
        return Promise.resolve(JSON.parse(cachedPokemonData.data));
    }

    // If no cached data, fetch from API
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            // Cache data in localStorage with a timestamp
            localStorage.setItem(pokemonName, JSON.stringify(
                {
                    timestamp: newDate().getTime(),
                    data: data
                }
            ));
            return data;
        });
}

function isCacheExpired(timestamp) {
    const cacheExpiration = 1000 * 60 * 60 * 24; // 24 hours
    return new Date().getTime() - timestamp > cacheExpiration;
}

function createPokemonCard(cachedPokemonData) {
    // Create card elements
    const card = document.createElement('div');

card.classList.add('pokemon-card');

    const cardImage = document.createElement('img');
    cardImage.src = `https://github.com/okwurt/dextracker/blob/main/sprites/icons/${cachedPokemonData.name}.png`;
    cardImage.alt = `${cachedPokemonData.name} icon`;

cardImage.classList.add('pokemon-card-img');

    const cardName = document.createElement('h3');
    cardName.textContent = cachedPokemonData.name;

cardName.classList.add('pokemon-card-name');

    const typesContainer = document.createElement('div');

typesContainer.classList.add('pokemon-card-types');

    // Create type elements
    for (let typeObj of cachedPokemonData.types) {
        const typeBadge = document.createElement('span');
        typeBadge.textContent = typeObj.type.name;

typeBadge.classList.add('pokemon-card-type', typeObj.type.name);

        typesContainer.append(typeBadge);
    }

    // Append card elements
    card.append(cardImage, cardName, typesContainer);
}

function displayPokemon(name) {
    const pokemonName = cachedPokemonData[name.toLowerCase()];
    if (pokemonName) {
        createPokemonCard(pokemonName);
    }
}
