import './App.css';
import './index.css';
import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const LocationPosts = () => {
    return (
    <div>
        <Header /> 
        <Outlet />
    </div>
  );
}

export default LocationPosts;