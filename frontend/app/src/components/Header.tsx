import React, { useEffect, useState, useLayoutEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createContext } from 'vm';
import { getCurrentUser, signOut } from '../lib/api/auth';
import { User } from '../interfaces';
import { AuthContext } from '../App';

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
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <h1 className="ml-3 text-xl">
                    <Link to="/LocationPosts">
                        Awsome Study Spaces
                    </Link>
                </h1>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 hover:text-gray-900"><Link to="/LocationPosts">LocationPosts</Link></a><br />
                <div>
                    {
                        isSignedIn && currentUser
                            ? 
                            <div>
                                {currentUser && <a className="mr-5 hover:text-gray-900">Wellcome!! {currentUser.name} </a>}<br />
                                <a className="mr-5 hover:text-gray-900"><Link to="/UserProfile">UserProfile</Link></a><br />
                                <a className="mr-5 hover:text-gray-900"><Link to="/PostCreate">Post Location</Link></a><br />
                                <button type="button" onClick={handleSignOut}>SignOut</button>
                            </div>
                            :
                            <div>
                                <a className="mr-5 hover:text-gray-900"><Link to="/SignUp">SignUp</Link></a><br />
                                <a className="mr-5 hover:text-gray-900"><Link to="/SignIn">SignIn</Link></a><br />
                            </div>
                    }
                </div>
                </nav>
                <div className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                </div>
            </div>
        </header>
    );
}

export default Header;