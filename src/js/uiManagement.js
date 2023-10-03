import { listAllCollections, getCollection } from './dataManagement.js';

function initializeSidebar() {
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
    
    detailsModal.querySelector('#pokemonNickname').value = pokemonData.nickname;
    detailsModal.querySelector('#pokemonShiny').checked = pokemonData.shiny;
    detailsModal.querySelector('#pokemonLevel').value = pokemonData.level;
    detailsModal.querySelector('#pokemonGender').value = pokemonData.gender;
    detailsModal.querySelector('#pokemonNature').value = pokemonData.nature;
    detailsModal.querySelector('#pokemonAbility').value = pokemonData.ability;
    detailsModal.querySelector('#pokemonMoves').value = pokemonData.moves.join(", ");
    detailsModal.querySelector('#pokemonGame').value = pokemonData.game;
    detailsModal.querySelector('#pokemonLocation').value = pokemonData.location;
    detailsModal.querySelector('#pokemonBall').value = pokemonData.ball;

    detailsModal.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    updateSidebar();
    document.querySelector('.sidebar-menu').addEventListener('click', (e) => {
        if (e.target.dataset.collection) {
        const collectionName = e.target.dataset.collection;

        displayPokemonList(collectionName);
        }
    });

document.getElementById('pokemonListContainer').addEventListener('click', (e) => {
    if (e.target.closest('.pokemon-item')) {
        const pokemonName = e.target.closest('.pokemon-item').querySelector('span').textContent;
        const pokemonData = getSpecificPokemon(pokemonName);

        displayPokemonDetails(pokemonData);
                }
            });
        });