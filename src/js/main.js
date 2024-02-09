import { pokemonData } from "./pokemonData.js";

function displayPokemon(pokemon) {
  let pokemonContainer = document.getElementById('pokemon');
  
  pokemonContainer.innerHTML = ''; // clear existing
  
  pokemon.forEach(p => {
    let pokemonElement = document.createElement('div');
    pokemonElement.textContent = p.name;
    
    pokemonContainer.appendChild(pokemonElement);
  });
}

function setupFormListeners() {
    document.getElementById('addPokemonForm').addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(event.target);
        let pokemonData = Object.fromEntries(formData.entries());
        console.log(pokemonData);
    });
}

function setupSearch() {
    document.getElementById('pokemonSearch').addEventListener('input', (event) => {
        let searchValue = event.target.value.toLowerCase();
        let filteredPokemon = pokemonData.filter((pokemon) => {
            return pokemon.name.includes(searchValue);
        });

        displayPokemon(filteredPokemon);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayPokemon(pokemonData);
    setupFormListeners();
    setupSearch();
});
