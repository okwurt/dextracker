// Sample collections object 

const collections = {
    "Origin Dex": [],
    "Shiny Living Dex": []
};

// Function to render collections in the sidebar

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

