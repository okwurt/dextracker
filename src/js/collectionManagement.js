import { renderPokemonCollection } from "./uiRendering.js";

let currentCollection = [];

export function addOrUpdatePokemonToCollection(pokemon) {
    const existingIndex = currentCollection.findIndex(p => p.id === pokemon.id);
    if (existingIndex !== -1) {
        currentCollection[existingIndex] = { ...currentCollection[existingIndex], ...pokemon };
    } else {
        currentCollection.push(pokemon);
    }
}

export function removePokemonFromCollection(pokemonId) {
    currentCollection = currentCollection.filter(p => p.id !== pokemonId);
}

export async function switchCollection (newCollectionName) {
    const currentCollectionName = getCurrentCollectionName();

localStorage.setItem(currentCollectionName, JSON.stringify(currentCollection));

    const savedData = localStorage.getItem(newCollectionName);
    currentCollection = savedData ? JSON.parse(savedData) : [];

    renderPokemonCollection();
}

export function saveCollection () {
    const currentCollectionName = getCurrentCollectionName();

localStorage.setItem(currentCollectionName, JSON.stringify(currentCollection));
}

export async function loadUserCollection (collectionFile) {
    try {
        const response = await fetch(collectionFile);
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);
        const collectionData = await response.json();
        return collectionData;
    } catch (error) {
        console.error('Error fetching Pokemon data', error);
        return null || [];
    }
}

export function getCurrentCollectionName () {
    return document.querySelector('.collectionName').textContent;
}