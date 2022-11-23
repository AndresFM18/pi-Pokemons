import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing.jsx'
import CrearPokemon from './components/CrearPokemon/CrearPoke.jsx'
import PokemonDetail from './components/PokemonDetail/PokemonDetail.jsx';
import Principal from './components/Principal/Principal.jsx'
import TypesFilter from './components/TypesFilter/TypesFilter';
import PokemonCard from './components/PokemonCard/PokemonCard';
import Missing from './components/missing/Missing';

function App() {
  return (

    <div className="App">
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/create' element={<CrearPokemon />}></Route>
        <Route path='/pokemon/:id' element={<PokemonDetail />}></Route>
        <Route path='/home' element={<Principal />} />
        <Route path='/types/:type' element={<TypesFilter />} />
        <Route exact path='/pokemon/null' element={<Missing/>}/>
        <Route exact path='/pokemon/undefined' element={<Missing/>}/>
        {/* <Route path='/create' element={<CrearRaza/>}></Route>
       <Route path='/home/:id' element={<Principal/>}/>
       <Route path='/dogs/:id' element={<DogDetail/>}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
