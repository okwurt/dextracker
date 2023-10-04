import { collections, getCollection, addPokemonToCollection, deletePokemonFromCollection } from './collections.js';

export function initializeSidebar() {
    const collectionsList = document.getElementById('collectionsList');

    collectionsList.innerHTML = ''; // Clear any existing content

    for (let collectionName in collections) {
        const collectionLink = document.createElement('a');
        collectionLink.href = '#';

collectionLink.getAttribute('data-collection-name', collectionName);
        collectionLink.textContent = collectionName;

collectionsList.appendChild(collectionLink);
    }      
}

export function initializePokemonList() {
    const pokemonListContainer = document.getElementById('pokemonListContainer');

    pokemonListContainer.innerHTML = ''; // Clear any existing content

    for (let collectionName in collections) {
        const collection = getCollection(collectionName);

        for (let pokemon of collection) {
            const pokemonItem = document.createElement('div');
            pokemonItem.classList.add('pokemon-item');
            pokemonItem.innerHTML = `
                <img src="./sprites/icons/${pokemon.name.toLowerCase()}.png" alt="${
                    pokemon.name
                  } sprite">
                <span>${pokemon.name}</span>
            `;
            pokemonListContainer.appendChild(pokemonItem);
        }
    }
}

export function initializeModals() {
    const addPokemonModal = document.getElementById('addPokemonModal');
    const addPokemonBtn = document.getElementById('addPokemonBtn');
    const closeModalBtn = document.getElementById('addPokemonCloseBtn');

addPokemonBtn.addEventListener('click', () => {

addPokemonModal.style.display = 'block';
    });

closeModalBtn.addEventListener('click', () => {

addPokemonModal.style.display = 'none';
    });
}

export function displayPokemonCollection(collectionName) {
    const currentCollection = getCollection(collectionName);
    const displayArea = document.getElementById('displayArea');

    displayArea.innerHTML = ''; // Clear any existing content

    currentCollection.forEach(pokemon => {
        const pokemonCard = createPokemonCard(pokemon);

displayArea.appendChild(pokemonCard);
    });
}

export function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="./sprites/icons/${pokemon.name.toLowerCase()}.png" alt="${
            pokemon.name
            } sprite">
        <p>Nickname: ${pokemon.nickname}</p>
        <p>Type: ${pokemon.type.join(', ')}</p>
        <p>Gender: ${pokemon.gender}</p>
        <p>Shiny: ${pokemon.shiny}</p>
        <p>Level: ${pokemon.level}</p>
        <p>Nature: ${pokemon.nature}</p>
        <p>Ability: ${pokemon.ability}</p>
        <p>Moves: ${pokemon.moves.join(', ')}</p>
        <p>Game: ${pokemon.game}</p>
        <p>Location: ${pokemon.location}</p>
        <p>Ball: ${pokemon.ball}</p>
        <p>OT: ${pokemon.ot}</p>
        <p>TID: ${pokemon.tid}</p>
        `;
    return card;
}

export function initializeCollectionManagement() {
    const addCollectionBtn = document.getElementById('addNewCollectionBtn');
    const removeCollectionBtn = document.getElementById('removeCollectionBtn');

    addCollectionBtn.addEventListener('click', () => {
        const newCollectionName = prompt('Enter the name of the new collection:');
        if (newCollectionName) {
            addCollection(newCollectionName);
            initializeSidebar();
        }
    });

    removeCollectionBtn.addEventListener('click', () => {
        const collectionNameToRemove = prompt('Enter the name of the collection to remove:');
        if (collectionNameToRemove) {
            removeCollection(collectionNameToRemove);
            initializeSidebar();
        }
    });
}

