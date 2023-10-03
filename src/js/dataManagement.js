function createCollection(collectionName) {
    if (localStorage.getItem(collectionName)) {
        console.error(`Collection ${collectionName} already exists`);
        return;
    }

localStorage.setItem(collectionName, JSON.stringify([])); // empty array
}

function addPokemonToCollection(collectionName, pokemonData) {
    const collection = getCollection(collectionName);
    collection.push(pokemonData);

localStorage.setItem(collectionName, JSON.stringify(collection));
}

function getCollection(collectionName) {
    return JSON.parse(localStorage.getItem(collectionName)) || [];
}

function updatePokemonInCollection(collectionName, pokemonId, updatedData) {
    const collection = getCollection(collectionName);
    const pokemonIndex = collection.findIndex((pokemon) => pokemon.id === pokemonId);

    if (pokemonIndex === -1) {
        collection[pokemonIndex] = updatedData;
    
    localStorage.setItem(collectionName, JSON.stringify(collection));
    } else {
        console.error(`Pokemon with dex no ${pokemonId} not found in collection ${collectionName}`);
    return;
    }
}

function deletePokemonFromCollection(collectionName, pokemonId) {
    const collection = getCollection(collectionName);
    const updatedCollection = collection.filter(pokemon => pokemon.id !== pokemonId);

localStorage.setItem(collectionName, JSON.stringify(updatedCollection));
}

function listAllCollections() {
    const collections = [];
    for (let i = 0; i < localStorage.length; i++) {
        
collections.push(localStorage.key(i));
    }
    return collections;
}