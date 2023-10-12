const pokemonNames = cachedPokemonData.map(pokemon => pokemon.name).sort();
const pokemonAbilities = cachedPokemonData.map(pokemon => pokemon.abilities).flat().sort();
const pokemonLocations = document.getElementById('pokemon-location');
const pokemonMoves = document.getElementById('pokemon-moves');

const pokemonNatures = {
        'adamant': 'Adamant',
        'bashful': 'Bashful',
        'bold': 'Bold',
        'brave': 'Brave',
        'calm': 'Calm',
        'careful': 'Careful',
        'docile': 'Docile',
        'gentle': 'Gentle',
        'hardy': 'Hardy',
        'hasty': 'Hasty',
        'impish': 'Impish',
        'jolly': 'Jolly',
        'lax': 'Lax',
        'lonely': 'Lonely',
        'mild': 'Mild',
        'modest': 'Modest',
        'naive': 'Naive',
        'naughty': 'Naughty',
        'quiet': 'Quiet',
        'quirky': 'Quirky',
        'rash': 'Rash',
        'relaxed': 'Relaxed',
        'sassy': 'Sassy',
        'serious': 'Serious',
        'timid': 'Timid' 
    };

const pokemonGames = {
        'red': 'Red',
        'blue': 'Blue',
        'green': 'Green',
        'yellow': 'Yellow',
        'gold': 'Gold',
        'silver': 'Silver',
        'crystal': 'Crystal',
        'ruby': 'Ruby',
        'sapphire': 'Sapphire',
        'emerald': 'Emerald',
        'firered': 'FireRed',
        'leafgreen': 'LeafGreen',
        'diamond': 'Diamond',
        'pearl': 'Pearl',
        'platinum': 'Platinum',
        'heartgold': 'HeartGold',
        'soulsilver': 'SoulSilver',
        'black': 'Black',
        'white': 'White',
        'black2': 'Black 2',
        'white2': 'White 2',
        'x': 'X',
        'y': 'Y',
        'omegaruby': 'Omega Ruby',
        'alphasapphire': 'Alpha Sapphire',
        'sun': 'Sun',
        'moon': 'Moon',
        'ultrasun': 'Ultra Sun',
        'ultramoon': 'Ultra Moon',
        'letsgoeevee': 'Let\'s Go Eevee',
        'letsgopikachu': 'Let\'s Go Pikachu',
        'sword': 'Sword',
        'shield': 'Shield',
        'brilliantdiamond': 'Brilliant Diamond',
        'shiningpearl': 'Shining Pearl',
        'legendsarceus': 'Legends: Arceus',
        'scarlet': 'Scarlet',
        'violet': 'Violet',
    };

    const pokemonBalls = {
        'pokeball': 'Poke Ball',
        'greatball': 'Great Ball',
        'ultraball': 'Ultra Ball',
        'masterball': 'Master Ball',
        'safariball': 'Safari Ball',
        'fastball': 'Fast Ball',
        'levelball': 'Level Ball',
        'lureball': 'Lure Ball',
        'heavyball': 'Heavy Ball',
        'loveball': 'Love Ball',
        'friendball': 'Friend Ball',
        'moonball': 'Moon Ball',
        'sportball': 'Sport Ball',
        'parkball': 'Park Ball',
        'dreamball': 'Dream Ball',
        'beastball': 'Beast Ball',
        'cherishball': 'Cherish Ball',
        'luxuryball': 'Luxury Ball',
        'duskball': 'Dusk Ball',
        'healball': 'Heal Ball',
        'nestball': 'Nest Ball',
        'netball': 'Net Ball',
        'premierball': 'Premier Ball',
        'repeatball': 'Repeat Ball',
        'timerball': 'Timer Ball',
        'masterball': 'Master Ball',
        'quickball': 'Quick Ball',
        'diveball': 'Dive Ball',
        'duskball': 'Dusk Ball',
    };

    function populateDropdown(elementId, data) {
        const dropdown = document.getElementById(elementId);

            while (dropdown.firstChild) {
                dropdown.removeChild(dropdown.firstChild);
            }

        for (let key in data) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data[key];

            dropdown.append(option);
        }
    }

    window.onload = function() {
        populateDropdown('pokemon-name', pokemonNames);
        populateDropdown('pokemon-nature', pokemonNatures);
        populateDropdown('pokemon-ability', pokemonAbilities);
        populateDropdown('pokemon-moves', pokemonMoves);
        populateDropdown('pokemon-game', pokemonGames);
        populateDropdown('pokemon-location', pokemonLocations);
        populateDropdown('pokemon-ball', pokemonBalls);
    }
