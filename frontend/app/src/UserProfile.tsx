import React, { useCallback, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import { AuthContext } from './App';



function UserProfile() {
    const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
    console.log(currentUser);

    return (
        <div>
            <Header />
            <h1>UserProfile</h1>
            {currentUser && (
                <div>
                    <h2>{ currentUser.name }</h2>
                    <h2>{ currentUser.email }</h2>
                </div>
            )}
        </div>
    );
}

export default UserProfile;