const pokedex = document.querySelector("#pokedex");

const fetchPokemon = () => {
 const promises = [];
    for (let i = 252; i <= 386; i++) {
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