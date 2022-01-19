import noPokemon from './assets/pokeball.png';
import './App.css';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
//import withReactContent from 'sweetalert2-react-content';
let state = 0;
//const MySwal = withReactContent(Swal);

function App() {
  const [pokemon, setPokemon] = useState({});


  const fetchPokemon = (id) => {
    if (id === 0) {

    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data));
    }
  }

  const BackPokemon = () => {
    state -= 1;
    if (state <= 0) { state = 500; }
    return state;
  }

  const NextPokemon = () => {
    state += 1;
    if (state > 500) {state = 1;}
    return state;
  }

  const showAbilities = () => {
    if (pokemon.name) {
      Swal.fire({
        imageUrl : "",
        title: "Abilities",
        text: `${pokemon.abilities.map( ab => {return '\n'+ab.ability.name})}`
      })
    } else {
      Swal.fire({
        title: `No Pokemon!`,
        icon: 'warning'
      });
    }
  }

  const getRandomInt = (min = 1, max = 500) => {
    state = Math.floor(Math.random() * (max - min) + min);
    return state;
  }


  useEffect(() => {
    fetchPokemon(state);
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <div className='flex-container'>
          <img src={pokemon?.sprites?.front_default ?? noPokemon} className="poke-image" alt="logo" />
          <img src={pokemon?.sprites?.back_default ?? noPokemon} className="poke-image" alt="logo" />
        </div>

        <p>
          {pokemon?.name ?? "No pokemon Detected"}
        </p>

        <p>
          {pokemon?.id ?? "No Pokemon ID"}
        </p>
        <p><a href='https://github.com/rodrilv/Pokemon-React-App'>GitHub Repo ;)</a></p>

        <div className='flex-container'>
          <button onClick={() => fetchPokemon((BackPokemon()))} className='button'>Back</button>
          <button onClick={() => fetchPokemon(getRandomInt())} className='button'>Random</button>
          <button onClick={() => fetchPokemon(NextPokemon())} className='button'>Next</button>
          <button onClick={() => showAbilities()} className='button'>Abilities</button>
        </div>
      </header>
    </div>
  );
}

export default App;
