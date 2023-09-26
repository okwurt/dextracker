import { loadStaticData } from "./pokemonData.js";
import { loadUserCollection } from "./collectionManagement.js";
import { renderPokemonCollection } from "./uiRendering.js";
import { setupEventListeners } from "./eventHandling.js";
import { renderPokemonList } from "./list.js";

export async function initialize() {
    const pokemonData = await loadStaticData();
    const userCollection = await loadUserCollection();

    renderPokemonList(pokemonData);
    renderPokemonCollection(userCollection);

    setupEventListeners();
}

initialize();

