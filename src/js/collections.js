// Sample collections object 

const collections = {};

// Function to render collections in the sidebar

function addCollection(collectionName) {
    collections[collectionName] = []; // Empty array
 }

 const addCollectionBtn = document.getElementById('addNewCollectionBtn');
 const collectionNameInput = document.getElementById('collectionName');

 addCollectionBtn.addEventListener('click', () => {
        const collectionName = collectionNameInput.value.trim();
        if (collectionName) {

addCollection(collectionName);


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

function renderCollections() {
    const collectionsList = document.getElementById('collectionsList');

    collectionsList.innerHTML = ''; // Clear any existing content

    for (let collectionName in collections) {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <a href="#" data-collection-name="${collectionName}">${collectionName}</a>
        `;

        collectionsList.appendChild(listItem);
    }

    // Append the 'Add Collection' button

    const addCollectionButton = document.createElement('li');
    addCollectionButton.innerHTML = `
        <button id="addNewCollectionBtn">Add New Collection</button>
    `;
}

// Initial render of collections

renderCollections();

document.getElementById('collectionsList').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        const selectedCollectionName = e.target.getAttribute('data-collection-name');

        // Display the selected collection

        displayPokemonCollection(selectedCollectionName);
    }
}); 

document.getElementById('addNewCollectionBtn').addEventListener('click', function() {
    const newCollectionName = prompt('Enter the name of the new collection:');

    if (newCollectionName) {
        collections[newCollectionName] = [];

        renderCollections();
    }
}); 

