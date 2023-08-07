const pokedex = document.querySelector("#pokedex");

const typeColor = {
  normal: "#a8a878",
  fighting: "#c03028",
  flying: "#a890f0",
  poison: "#a040a0",
  ground: "#e0c068",
  rock: "#b8a038",
  bug: "#a8b820",
  ghost: "#705898",
  steel: "#b8b8d0",
  fire: "#f08030",
  water: "#6890f0",
  grass: "#78c850",
  electric: "#f8d030",
  psychic: "#f85888",
  ice: "#98d8d8",
  dragon: "#7038f8",
  dark: "#705848",
  fairy: "#ee99ac"
}


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

const typeElements = types.map(type => `<span class="type type-${type}"style="background-color: ${typeColor[type]};">${type}
</span>`)

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
