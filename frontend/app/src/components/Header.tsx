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
        
        <header className="body-font text-left flex p-4">
            <h1 className="text-4xl w-3/4">
                <Link to="/LocationPosts">
                🧑‍💻Awsome Study Spaces🧑‍💻
                </Link>
            </h1>    
            <div className='text-right text-l'>
                {isSignedIn && currentUser ? 
                <>
                    {currentUser && <a className="mr-5 hover:text-gray-900">Welcome!! {currentUser.name}</a>}
                    <a className="mx-50 hover:text-gray-900" href="/LocationPosts" style={{ margin: '5px' }}>LocationPosts</a>
                    <a className="mr-5 hover:text-gray-900" href="/UserProfile" style={{ margin: '5px' }}>UserProfile</a>
                    <a className="mr-5 hover:text-gray-900" href="/PostCreate" >Post Location</a>
                    <button type="button" onClick={handleSignOut}>SignOut</button>
                </>
                :
                <>
                    <a className="m-50 hover:text-gray-900" href="/LocationPosts" style={{ margin: '5px' }}>LocationPosts</a>
                    <a className="mr-5 hover:text-gray-900" href="/SignUp" style={{ margin: '5px' }}>SignUp</a>
                    <a className="mr-5 hover:text-gray-900" href="/SignIn" style={{ margin: '5px' }}>SignIn</a>
                </>
                }
            </div>
        </header>
    );
}

export default Header;