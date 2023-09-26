import { addOrUpdatePokemonToCollection } from './collectionManagement.js';

export function renderPokemonCollection(collectionData, view) {
    const container = view === 'list' ? document.getElementById('listContainer') : document.getElementById('cardContainer');
    container.innerHTML = '';

    collection.forEach(pokemon => {
        const element = view === 'list' ? renderPokemonRow(pokemon) : renderPokemonCard(pokemon);

        container.appendChild(element);
    });
}

export function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className.add('pokemonCard');

    const name = document.createElement('h2');
    name.textContent = pokemon.name;

    const image = document.createElement('img');
    image.src = `sprites/weekly/pokemon/${pokemon.name.toLowerCase()}.png`;

    const button = document.createElement('button');
    button.textContent = 'Add to Collection';
    button.addEventListener('click', () => {
        addOrUpdatePokemonToCollection(pokemon);
    });

    card.appendChild(name);
    card.appendChild(image);
    card.appendChild(button);

    return card;
}

export function renderPokemonDetails(pokemon) {
    const types = pokemon.types.map(type => type.type.name).join(', ');
    const abilities = pokemon.abilities.map(ability => ability.ability.name).join(', ');
    const evYield = pokemon.evYield.map(stat => `${stat.stat.name} ${stat.effort}`).join(', ');
    const forms = pokemon.forms.map(form => form.displayName).join(', ');
    const preEvolutions = pokemon.preEvolutions.map(evo => `${evo.name} at level ${evo.condition}`).join(', ');
    const evolutions = pokemon.evolutions.map(evo => `${evo.name} at level ${evo.condition}`).join(', ');

    return `
        <div class="pokemon-details">
            <div class="pokemon-details__header">
                <h2>${pokemon.name} - 
                ${pokemon.species}
                </h2>
                <p><strong>Types:</strong> ${types}</p>
                <p><strong>Height:</strong> ${pokemon.height}</p>
                <p><strong>Weight:</strong> ${pokemon.weight}</p>
                <p><strong>Abilities:</strong> ${abilities}</p>
                <p><strong>Egg Groups:</strong> ${pokemon.eggGroups}</p>
                <p><strong>Base Stats:</strong></p>
                <ul>
                    <li>HP: ${pokemon.baseStats.hp}</li>
                    <li>Attack: ${pokemon.baseStats.attack}</li>
                    <li>Defense: ${pokemon.baseStats.defense}</li>
                    <li>Special Attack: ${pokemon.baseStats.specialAttack}</li>
                    <li>Special Defense: ${pokemon.baseStats.specialDefense}</li>
                    <li>Speed: ${pokemon.baseStats.speed}</li>
                </ul>
                <p><strong>EV Yield:</strong> ${evYield}</p>
                <p><strong>Forms:</strong> ${forms}</p>
                <p><strong>Pre-Evolutions:</strong> ${preEvolutions}</p>
                <p><strong>Evolutions:</strong> ${evolutions}</p>
            </div>
            `;
}

export async function renderPokemonDetailsbyName(pokemonNames) {
    try {
        const pokemonData = await fetchPokemonByName(pokemonNames);
        if (pokemonData) {
            const pokemonHtml = renderPokemonDetails(pokemonData);

            document.getElementById('pokemon-details-container').innerHTML = pokemonHtml;
        } else {
            console.error('Pokemon not found');
        }
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
    }
}

export function displayMergedData (mergedPokemonData) {
    const detailsContainer = document.getElementById('mergedPokemonDetails');

    detailsContainer.innerHTML = '';
    
    const nameElement = document.createElement('h2');
    nameElement.textContent = mergedPokemonData.nickname || mergedPokemonData.name;

    const speciesElement = document.createElement('p');
    speciesElement.textContent = `Species: ${mergedPokemonData.species}`;

    const levelElement = document.createElement('p');
    levelElement.textContent = `Level: ${mergedPokemonData.level}`;

    const typeElement = document.createElement('p');   
    typeElement.textContent = `Type: ${mergedPokemonData.type.join(', ')}`;

    const abilityElement = document.createElement('p');
    abilityElement.textContent = `Ability: ${mergedPokemonData.ability}`;

    const heightElement = document.createElement('p');
    heightElement.textContent = `Height: ${mergedPokemonData.height}`;

    const weightElement = document.createElement('p');
    weightElement.textContent = `Weight: ${mergedPokemonData.weight}`;

    const hpElement = document.createElement('p');
    hpElement.textContent = `HP: ${mergedPokemonData.hp}`;

    const attackElement = document.createElement('p');
    attackElement.textContent = `Attack: ${mergedPokemonData.attack}`;

    const defenseElement = document.createElement('p');
    defenseElement.textContent = `Defense: ${mergedPokemonData.defense}`;

    const specialAttackElement = document.createElement('p');
    specialAttackElement.textContent = `Special Attack: ${mergedPokemonData.specialAttack}`;

    const specialDefenseElement = document.createElement('p');
    specialDefenseElement.textContent = `Special Defense: ${mergedPokemonData.specialDefense}`;

    const speedElement = document.createElement('p');
    speedElement.textContent = `Speed: ${mergedPokemonData.speed}`;

    const evYieldElement = document.createElement('p');
    evYieldElement.textContent = `EV Yield: ${mergedPokemonData.evYield}`;

    const eggGroupsElement = document.createElement('p');
    eggGroupsElement.textContent = `Egg Groups: ${mergedPokemonData.eggGroups}`;

    const formsElement = document.createElement('p');
    formsElement.textContent = `Forms: ${mergedPokemonData.forms}`;

    const preEvolutionsElement = document.createElement('p');
    preEvolutionsElement.textContent = `Pre-Evolutions: ${mergedPokemonData.preEvolutions}`;

    const evolutionsElement = document.createElement('p');
    evolutionsElement.textContent = `Evolutions: ${mergedPokemonData.evolutions}`;

    detailsContainer.appendChild(nameElement);
    detailsContainer.appendChild(speciesElement);
    detailsContainer.appendChild(levelElement);
    detailsContainer.appendChild(typeElement);
    detailsContainer.appendChild(abilityElement);
    detailsContainer.appendChild(heightElement);
    detailsContainer.appendChild(weightElement);
    detailsContainer.appendChild(hpElement);
    detailsContainer.appendChild(attackElement);
    detailsContainer.appendChild(defenseElement);
    detailsContainer.appendChild(specialAttackElement);
    detailsContainer.appendChild(specialDefenseElement);
    detailsContainer.appendChild(speedElement);
    detailsContainer.appendChild(evYieldElement);
    detailsContainer.appendChild(eggGroupsElement);
    detailsContainer.appendChild(formsElement);
    detailsContainer.appendChild(preEvolutionsElement);
    detailsContainer.appendChild(evolutionsElement);

    document.getElementById('pokemon-details-container').style.display = 'none';
    document.getElementById('mergedPokemonDetails').style.display = 'block';

}

export function toggleView() {
    const listView = document.getElementById('listViewBtn');
    const cardView = document.getElementById('cardViewBtn');

    listView.addEventListener('click', () => {
        document.getElementById('listContainer').style.display = 'block';
        document.getElementById('cardContainer').style.display = 'none';
    });

    cardView.addEventListener('click', () => {
        document.getElementById('listContainer').style.display = 'none';
        document.getElementById('cardContainer').style.display = 'block';
    });
}

export function renderPokemonRow(pokemon) {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = pokemon.name;
    row.appendChild(nameCell);

    const nicknameCell = document.createElement('td');
    nicknameCell.textContent = pokemon.nickname;
    row.appendChild(nicknameCell);

    const levelCell = document.createElement('td');
    levelCell.textContent = pokemon.level;
    row.appendChild(levelCell);

    const typeCell = document.createElement('td');
    typeCell.textContent = pokemon.type.join(', ');
    row.appendChild(typeCell);

    const abilityCell = document.createElement('td');
    abilityCell.textContent = pokemon.ability;
    row.appendChild(abilityCell);

    const movesCell = document.createElement('td');
    movesCell.textContent = pokemon.moves.join(', ');
    row.appendChild(movesCell);

    const gameCell = document.createElement('td');
    gameCell.textContent = pokemon.game;
    row.appendChild(gameCell);

    const ballCell = document.createElement('td');
    ballCell.textContent = pokemon.ball;
    row.appendChild(ballCell);

    return row;
}

export function renderPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';

    const header = document.createElement('div');
    header.className = 'pokemon-header';
    header.innerHTML = `
        <h2 class="pokemon-nickname">${pokemon.nickname} (${pokemon.name})</h2>
        div class ="pokemon-name">${pokemon.name}</div>
        <div class="pokemon-level">Level: ${pokemon.level}</div>
        <div class="pokemon-gender">Gender: ${pokemon.gender}</div>
    `};