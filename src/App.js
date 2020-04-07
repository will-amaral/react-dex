import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';

import Wrapper from 'containers/Wrapper';
import PokemonList from 'components/PokemonList';

export default () => {
  const [pokemons, setPokemons] = useState([]);
  const [hasMoreItens, setHasMoreItens] = useState(true);
  const [next, setNext] = useState();

  const fetchData = async () => {
    console.log(next);
    const url = next ? next : 'https://pokeapi.co/api/v2/pokemon';
    const { data } = await axios.get(url);
    setPokemons([...pokemons, data.results].flat());
    if (data.next) {
      setNext(data.next);
    } else {
      setHasMoreItens(false);
    }
  };

  return (
    <InfiniteScroll pageStart={0} loadMore={fetchData} hasMore={hasMoreItens}>
      <Wrapper>
        <PokemonList pokemons={pokemons} />
      </Wrapper>
    </InfiniteScroll>
  );
};
