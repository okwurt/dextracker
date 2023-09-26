import { loadStaticData } from "./pokemonData.js";
import { loadUserCollection } from "./collectionManagement.js";
import { renderPokemonCollection } from "./uiRendering.js";
import { setupEventListeners } from "./eventHandling.js";

export async function initialize() {
    const staticData = await loadStaticData();
    if (!staticData) {
        console.error('Error loading static data.');
        return;
    }

    const collectionData = loadUserCollection('data/origindex.json');
    if (!collectionData) {
        console.error('Error loading collection data.');
        return;
    } 

    renderPokemonCollection(collectionData, staticData);

    setupEventListeners(collectionData, staticData);
}

initialize();

