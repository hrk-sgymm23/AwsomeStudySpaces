import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import Header from './components/Header';

function Home() {

  return (
    <div className="Home">
        <Header />
        <h1>Home</h1>
    </div>
  );
}

export default Home;