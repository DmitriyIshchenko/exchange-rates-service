import React from 'react';
import './App.css';
import { Exchanger } from "./features/exchanger/Exchanger"
import Rates from "./features/exchanger/Rates"
import { Routes, Route } from "react-router-dom";
import Navbar from './features/exchanger/Navbar';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Exchanger />} />
        <Route path="/rates" element={<Rates />} />
      </Routes>
    </div>
  )
}

export default App;
