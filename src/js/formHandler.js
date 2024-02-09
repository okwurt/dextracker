document.getElementById('addPokemonForm').addEventListener('submit', (event) => {
  event.preventDefault();
  let formData = new FormData(event.target);
  let pokemonData = Object.fromEntries(formData.entries());

  console.log(pokemonData);
});
