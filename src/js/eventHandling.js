import { renderPokemonCollection } from "./uiRendering.js";

export function setupEventListeners() {
    const listViewBtn = document.getElementById('listViewBtn');
    const cardViewBtn = document.getElementById('cardViewBtn');

    listViewBtn.addEventListener('click', () => {
        renderPokemonCollection(currentCollection, 'list');
    });

    cardViewBtn.addEventListener('click', () => {
        renderPokemonCollection(currentCollection, 'card');
    });
}