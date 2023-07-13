import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonNameContext from './Context/PokemonName/PokemonNameContext';
import { useState } from 'react';
import ErrorBoundary from './Components/ErrorBoundary'


function App() {
  const [state,setState] = useState([]);
  return (
    <ErrorBoundary>
    <PokemonNameContext.Provider value={{state,setState}}>
      <Home/>
      </PokemonNameContext.Provider>
      </ErrorBoundary>
      
  );
}

export default App;
