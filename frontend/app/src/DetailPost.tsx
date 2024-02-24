import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';

function DetailPost() {

  return (
    <div className="App">
      <Header />
      <h1>detail</h1>
    </div>
  );
}

export default DetailPost;