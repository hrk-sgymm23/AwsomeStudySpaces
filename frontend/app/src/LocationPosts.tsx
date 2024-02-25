import './App.css';
import React from 'react';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';
import Card from './components/Card';
import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const LocationPosts = () => {
    const params = useParams();
    return (
    <div>
        <Header /> 
        <Outlet />
    </div>
  );
}

export default LocationPosts;