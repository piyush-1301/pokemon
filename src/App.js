import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonNameContext from './Context/PokemonName/PokemonNameContext';
import { useState } from 'react';
import ErrorBoundary from './Components/ErrorBoundary'
import { Provider } from "react-redux";
import store from "./store";

function App() {
  const [state,setState] = useState([]);
  return (
    <ErrorBoundary>
    <Provider store = {store}>
    <PokemonNameContext.Provider value={{state,setState}}>
      <Home/>
      </PokemonNameContext.Provider>
      </Provider>
      </ErrorBoundary>
      
  );
}

export default App;
