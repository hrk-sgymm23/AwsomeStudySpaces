import { create } from 'domain';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createContext } from 'vm';
import { getCurrentUser } from '../lib/api/auth';
import { data } from 'autoprefixer';

interface User {
    id: number
    uid: string
    provider: string
    email: string
    name: string
    nickname?: string
    image?: string
    allowPasswordChange: boolean
    created_at: Date
    updated_at: Date
}

export const AuthContext = () => createContext( {} as{
    isSignedIn: boolean
    setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
    currentUser: User | undefined
    setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

function Header() {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [currentUser, setCurrentUser] = useState<User | undefined>()


    const handleGetUserCurrent = async() => {
        try {
            const response = await getCurrentUser()
    
            if (response?.data.isLogin === true) {
                setIsSignedIn(true)
                setCurrentUser(response?.data.data)
                console.log(response?.data.data)
            } else {
                console.log("not current user")
            }
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        handleGetUserCurrent()
    }, [setCurrentUser])

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <h1 className="ml-3 text-xl">
                    <Link to="/">
                        Awsome Study Spaces
                    </Link>
                </h1>
                </a>
                <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
                <a className="mr-5 hover:text-gray-900"><Link to="/LocationPosts">LocationPosts</Link></a><br />
                <div>
                    {
                        isSignedIn
                            ? 
                            <div>
                                <a className="mr-5 hover:text-gray-900"><Link to="/UserProfile">UserProfile</Link></a><br />
                                <a className="mr-5 hover:text-gray-900"><Link to="/PostCreate">Post Location</Link></a><br />
                            </div>
                            :
                            <div><a className="mr-5 hover:text-gray-900"><Link to="/SignUp">SignUp</Link></a><br /></div>
                    }
                </div>
                </nav>
                <div className="inline-flex items-center border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg> */}
                </div>
            </div>
        </header>
    );
}

export default Header;