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
                <div class="column-id">${pokemon.id}</div>
                <img src="./sprites/icons/${pokemon.name.toLowerCase()}.png" alt="${pokemon.name} sprite">
                <div class="pokemon-name">${pokemon.name}</div>
                <div class="pokemon-type">
                ${pokemon.type.map(type => 
                    `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
                ).join('')}
                </div>
                <div class="pokemon-abilities">
                    ${pokemon.abilities.map(ability => 
                        ability === pokemon.abilities[pokemon.abilities.length - 1] ? `<em>${ability}</em>` : ability
                    ).join(', ')}
                </div>
                <div class="pokemon-base-stats">
                    <ul>
                        ${Object.entries(pokemon.baseStats).map(([stat, value]) => 
                            `<li>${stat.toUpperCase()}: ${value}</li>`
                        ).join('')}
                    </ul>
                </div>
                <div class="pokemon-egg-groups"> ${pokemon.eggGroups.join(', ')}</div>
            </div>
        `;

        if (pokemon.forms && pokemon.forms.length > 0) {
            const formsCarousel = renderFormsCarousel(pokemon.forms);

            listItem.appendChild(formsCarousel);
        }

        list.appendChild(listItem);
    });

    listContainer.appendChild(list);
}

export function renderFormsCarousel(pokemonForms) {
    const carousel = document.createElement('div');
    carousel.className = 'forms-carousel';

    const nonBattleForms = pokemonForms.filter(form => !form.isBattleForm);

    nonBattleForms.forEach(form => {
        let slide = document.createElement('div');
        slide.className = 'forms-slide';

        slide.innerHTML = `
            <img src="./sprites/${form.formName.toLowerCase()}.png" alt="${form.displayName} sprite">
            <div class="form-name">${form.displayName}</div>
            <div class="form-type">
                ${form.type.map(type => 
                    `<span class="type-badge ${type.toLowerCase()}">${type}</span>`
                ).join('')}
            </div>
        `;
        carousel.appendChild(slide);
    }); 

    return carousel;
}