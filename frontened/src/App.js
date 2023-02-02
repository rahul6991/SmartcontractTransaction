import React from 'react';
import './App.css';
import { Web3Provider } from './context/contractContext';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Web3Provider>
        <Home />
      </Web3Provider>

    </div>
  );
}

export default App;
