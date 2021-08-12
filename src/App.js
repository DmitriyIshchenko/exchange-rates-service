import React from 'react';
import './App.css';
import { Exchanger } from "./features/exchanger/Exchanger"
import { Graph } from "./features/graph/Graph"

function App() {
  return (
    <div id="app-container">
      <Exchanger />
      <Graph />
    </div>
  )
}

export default App;
