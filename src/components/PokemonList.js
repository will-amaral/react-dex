import React from 'react';

import PokemonCard from 'components/PokemonCard';

export default ({ pokemons }) => {
  console.log(pokemons);
  if (!pokemons.length) return null;

  return pokemons.map((poke) => <PokemonCard key={poke.name} poke={poke} />);
};
