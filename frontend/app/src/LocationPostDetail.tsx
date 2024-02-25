import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';

function LocationPostDetail() {

  return (
    <div>
      <Header />  
      <h1>Detail</h1>
    </div>
  );
}

export default LocationPostDetail;