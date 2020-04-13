import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom';

import Wrapper from 'containers/Wrapper';
import PokemonList from 'components/PokemonList';
import PokemonDetails from 'components/PokemonDetails';

export default () => {
  const [pokemons, setPokemons] = useState([]);
  const [hasMoreItens, setHasMoreItens] = useState(true);
  const [search, setSearch] = useState();
  const [next, setNext] = useState();

  const fetchData = async () => {
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
    <Switch>
      <Route exact path='/'>
        <InfiniteScroll pageStart={0} loadMore={fetchData} hasMore={hasMoreItens}>
          <Wrapper>
            {pokemons &&
              pokemons.map((poke) => <PokemonList key={poke.name} poke={poke} />)}
          </Wrapper>
        </InfiniteScroll>
      </Route>
      <Route path='/:id'>
        <PokemonDetails />
      </Route>
    </Switch>
  );
};
