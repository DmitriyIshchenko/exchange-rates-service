import React from 'react';
import './App.css';
import { Exchanger } from "./features/exchanger/Exchanger"
import Rates from "./features/exchanger/Rates"
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div id="app-container">
      <Routes>
        <Route path="/" element={<Exchanger />} />
        <Route path="/rates" element={<Rates />} />
      </Routes>
    </div>
  )
}

export default App;
