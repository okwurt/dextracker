// src/js/List.js

export function renderPokemonList(pokemonData) {
    const listContainer = document.getElementById('pokemonListContainer');
    listContainer.innerHTML = '';  // Clear any existing content

    const list = document.createElement('ul');
    list.className = 'pokemon-item';

    pokemonData.forEach(pokemon => {
        const listItem = document.createElement('li');

        // Construct inner HTML for each Pokemon
        listItem.innerHTML = `
            <div class="pokemon-card">
                <div class="poke-id">${pokemon.id}</div>
                <img src="./sprites/games/scarlet-violet/normal/${pokemon.name.toLowerCase()}.png" alt="${
          pokemon.name
        } sprite">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-type">
                ${pokemon.type
                  .map(
                    (type) =>
                      `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
                  )
                  .join("")}
                </div>
            </div>
        `;

        list.appendChild(listItem);
    });

    listContainer.appendChild(list);
}