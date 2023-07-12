import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonNameContext from './Context/PokemonName/PokemonNameContext';
import { useState } from 'react';

function App() {
  const [state,setState] = useState([]);
  return (
    <PokemonNameContext.Provider value={{state,setState}}>
      <Home/>
      </PokemonNameContext.Provider>
  );
}

export default App;
