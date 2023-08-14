const pokedex = document.querySelector("#pokedex");

const fetchPokemon = () => {
 const promises = [];
    for (let i = 1; i <= 151; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      promises.push(fetch(url).then((res) => res.json()));    
    }

    Promise.all(promises).then((results) => {
      const pokemon = results.map((data) => ({
         name: data.name,
         id: data.id,
         image: data.sprites["front_default"],
         type: data.types.map((type) => type.type.name).join(" | "),
       }));
        
      displayPokemon(pokemon);     
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);

    const pokemonHTMLstring = pokemon
      .map(
        (mon) => `<li class="card">
      <img class="card-image" src="${mon.image}" />
      <h2 class="card-title"><span class="id">${mon.id}. </span> ${mon.name}</h2>
      <h4 class="card-subtitle">Type: ${mon.type}
</li>`
      )
      .join("");
    
    pokedex.innerHTML = pokemonHTMLstring;
};

fetchPokemon();

// Display import sidebar when the import button is clicked
const openSidebarbutton = 
document.getElementById('openSidebar');
const sidebarForm = document.getElementById('sidebarForm');

openSidebarbutton.addEventListener('click', function() {
  sidebarForm.classList.toggle('hidden');
});
  

// Fetch Pokémon collection data and display cards
fetch('pokemon-collection.json')
  .then(response => response.json())
  .then(data => {
    const collectionContainer = document.getElementById('collection-container');
    data.forEach(pokemon => {
      const card = createPokemonCard(pokemon);
      collectionContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching collection data:', error));

// Function to create a Pokémon card based on the data
function createPokemonCard(pokemon) {
  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <h2>${pokemon.name}</h2>
    <p>Dex Number: ${pokemon.dexNumber}</p>
    <p>Type: ${pokemon.type}</p>
    <p>Game: ${pokemon.game}</p>
    <p>Location: ${pokemon.location}</p>
    <p>Capture Method: ${pokemon.captureMethod}</p>
    <!-- Add more information as needed -->
  `;
  return card;
}
