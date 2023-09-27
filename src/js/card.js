function createPokemonCard(id, name, type, game, ball, nickname = null, gender = null) {
    return new PokemonCard(id, name, type, game, ball, nickname, gender);
}

