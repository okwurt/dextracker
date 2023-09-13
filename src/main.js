let pokemonList = [];
const addPokemonBtn = document.getElementById('addPokemonBtn');
const addPokemonModal = document.getElementById('addPokemonModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const addPokemonForm = document.getElementById('addPokemonForm');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonNameDropdown = document.getElementById('pokemonNameDropdown');
const pokemonData = ('data/pokemonData.json');  

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
        spriteImg.src = `https://raw.githubusercontent.com/okwurt/dextracker/main/sprites/icons/${pokemon.name.toLowerCase()}.png`;
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

// Event listener to open the modal
document.getElementById("addPokemonBtn").addEventListener("click", () => {
  addPokemonModal.style.display = "block";
});

// Event listener to close the modal
closeModalBtn.addEventListener("click", () => {
  addPokemonModal.style.display = "none";
  addPokemonForm.reset(); // Reset the form when closing the modal
});

// Event listener for form submission
addPokemonForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  const formData = new FormData(addPokemonForm);

  // Retrieve form data and perform the necessary actions
  const pokemonName = formData.get("pokemonName");
  // Process other form fields and add the Pokémon to the collection
  // ...

  // Close the modal
  addPokemonModal.style.display = "none";
  addPokemonForm.reset();
});

// Event listener for input changes to provide Pokémon name suggestions
pokemonNameInput.addEventListener("input", () => {
  const inputValue = pokemonNameInput.value.toLowerCase();
  const suggestions = filterPokemonSuggestions(inputValue);

  // Clear previous suggestions
  pokemonNameDropdown.innerHTML = "";

  // Display new suggestions
  suggestions.forEach((suggestion) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.textContent = suggestion;
    suggestionItem.addEventListener("click", () => {
      pokemonNameInput.value = suggestion;
      pokemonNameDropdown.innerHTML = "";
    });
    pokemonNameDropdown.appendChild(suggestionItem);
  });
});

// Function to filter Pokémon name suggestions based on user input
function filterPokemonSuggestions(input) {
  return pokemonData
    .filter((pokemon) => pokemon.name.toLowerCase().includes(input))
    .map((pokemon) => pokemon.name);
}
