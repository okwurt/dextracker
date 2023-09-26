// src/js/List.js

export function renderPokemonList(pokemonData) {
    const listContainer = document.getElementById('pokemonListContainer');
    listContainer.innerHTML = '';  // Clear any existing content

    const list = document.createElement('ul');
    list.className = 'pokemon-list';

    pokemonData.forEach(pokemon => {
        const listItem = document.createElement('li');

        // Construct inner HTML for each Pokemon
        listItem.innerHTML = `
            <div class="pokemon-item">
                <div class="pokemon-id">ID: ${pokemon.id}</div>
                <img src="./sprites/icons/${pokemon.name.toLowerCase()}.png" alt="${pokemon.name} sprite">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-type">Type: ${pokemon.type.join(', ')}</div>
                <div class="pokemon-abilities">
                    Abilities: ${pokemon.abilities.map(ability => 
                        ability === pokemon.abilities[pokemon.abilities.length - 1] ? `<em>${ability}</em>` : ability
                    ).join(', ')}
                </div>
                <div class="pokemon-base-stats">
                    Base Stats:
                    <ul>
                        ${Object.entries(pokemon.baseStats).map(([stat, value]) => 
                            `<li>${stat.toUpperCase()}: ${value}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="pokemon-egg-groups">Egg Groups: ${pokemon.eggGroups.join(', ')}</div>
            </div>
        `;

        list.appendChild(listItem);
    });

    listContainer.appendChild(list);
}
