let pokemonList = [];

// Fetch the Pokémon data from your JSON
fetch('data/pokemonData.json')
    .then(response => response.json())
    .then(data => {
        pokemonList = data; // Assuming your JSON structure is an array of Pokémon objects
    })
    .catch(error => {
        console.error("Error fetching Pokémon data:", error);
    });

document.getElementById('pokemonSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    let filteredList = [];

    if (searchTerm) {
        filteredList = pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    }

    displayResults(filteredList);
});

function displayResults(list) {
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = ''; // Clear previous results

    list.forEach(pokemon => {
        const listItem = document.createElement('li');

        const spriteImg = document.createElement('img');
        spriteImg.src = `https://raw.githubusercontent.com/okwurt/dextracker/sprites/icons/${pokemon.name.toLowerCase()}.png`;
        spriteImg.alt = pokemon.name + " sprite";
        spriteImg.width = 30; // Adjust size as needed
        listItem.appendChild(spriteImg);

        const nameSpan = document.createElement('span');
        nameSpan.textContent = pokemon.name;
        listItem.appendChild(nameSpan);

        listItem.addEventListener('click', function() {
            // Handle selection, e.g., populate the rest of the form based on the selected Pokémon
            document.getElementById('pokemonSearch').value = pokemon.name;
            resultsList.innerHTML = ''; // Clear results after selection
        });

        resultsList.appendChild(listItem);
    });
}
