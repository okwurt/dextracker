import { listAllCollections, getCollection } from './dataManagement.js';

function updateSidebar() {
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const collections = listAllCollections();
    let collectionHTML = collections.map(collection => `<li><a href="#"
    data-collection="${collection.name}">$
    {collection.name}</a><li>`).join('');

    sidebarMenu.innerHTML = collectionHTML;
}

function displayPokemonList(collectionName) {
    const collection = getCollection(collectionName);
    const listContainer = document.getElementById('pokemonListContainer');
    let pokemonHTML = collection.map(pokemon => `
            <div class="pokemon-item">
                <span>${pokemon.id}</span>
                <img src="./sprites/icons/${pokemon.name.toLowerCase()}.png" alt="${pokemon.name} sprite">
                <span>${pokemon.name}</span>
                <span>${pokemon.type.join(", ")}</span>
                <span>${pokemon.abilities.join(", ")}</span>
                <span>${pokemon.baseStats.total}</span>
                <span>${pokemon.eggGroups.join(", ")}</span>
            </div>
    `).join('');
    listContainer.innerHTML = pokemonHTML;
}

function displayPokemonDetails(pokemonData) {
    const detailsModal = document.getElementById('pokemonDetailsModal');
    const detailsModalContent = document.querySelector('.modal-content');
    detailsModalContent.innerHTML = `
    <span class="close">&times;</span>`

    detailsModal.style.display = 'block';
}