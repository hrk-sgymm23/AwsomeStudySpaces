import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';
// import Body from './components/body';
import Footer from './components/Footer';
import Card from './components/Card';

function App() {

  return (
    <div className="App">
      <Header />
      <Card />
      {/* <Footer /> */}
    </div>
  );
}

export default App;