import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';

function UserProfile() {
    return (
        <div>
            <Header />
            <h1>UserProfile</h1>
        </div>
    );
}

export default UserProfile;