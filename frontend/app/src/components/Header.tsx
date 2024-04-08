import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createContext } from 'vm';
import { getCurrentUser, signOut } from '../lib/api/auth';
import { User } from '../interfaces';
import { AuthContext } from '../App';
import '../dist/tailwind.css';

function Header() {
    const { isSignedIn, currentUser, setIsSignedIn, setCurrentUser } = useContext(AuthContext);
    const navigator = useNavigate()

    const handleSignOut = async() => {
        try {
            const response = await signOut()
            if (response?.status === 200) {
                localStorage.clear()
                alert("SignOut Success!!")
                setIsSignedIn(false)
                navigator("/LocationPosts")
            } else {
                alert("Signout Failed...")
            }
        } catch (err) {
            console.log("Signout Failed...")
        }
    }

    return (
        <header className="body-font text-left flex p-4 m-4">
            <h1 className="text-4xl w-3/4 font-bold">
                <Link to="/LocationPosts" className="hover:text-blue-600 transition-colors duration-300">
                    🧑‍💻Awsome Study Spaces🧑‍💻
                </Link>
            </h1>    
            <div className='group body-font text-right text-xl font-bold'>
                <div className='group-hover:visible opacity-100'>
                    {isSignedIn && currentUser ? 
                    <>
                        {currentUser && <a>User: {currentUser.name}</a>}
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/LocationPosts" style={{ margin: '5px' }}>LocationPosts</a>
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/UserProfile" style={{ margin: '5px' }}>UserProfile</a>
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/PostCreate">Post Location</a>
                        <button type="button" onClick={handleSignOut}>SignOut</button>
                    </>
                    :
                    <>
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/LocationPosts" style={{ margin: '5px' }}>LocationPosts</a>
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/SignUp" style={{ margin: '5px' }}>SignUp</a>
                        <a className="m-5 hover:text-blue-600 transition-colors duration-300" href="/SignIn" style={{ margin: '5px' }}>SignIn</a>
                    </>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;