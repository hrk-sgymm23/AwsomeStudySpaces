import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from '../lib/api/auth';
import { AuthContext } from '../App';
import '../dist/tailwind.css';

function Header() {
    const { isSignedIn, currentUser, setIsSignedIn } = useContext(AuthContext);
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
                    <span role="img" aria-labelledby="aboutEmoji">
                        🧑‍💻
                    </span>
                        Awsome Study Spaces
                    <span role="img" aria-labelledby="aboutEmoji">
                        🧑‍💻
                    </span>
                </Link>
            </h1>    
            <div className='flex group body-font text-right text-xl font-bold'>
                <div className='group-hover:visible opacity-100 whitespace-no-wrap flex items-center'>
                    {isSignedIn && currentUser ? 
                    <>
                        {currentUser && <a href='/#' className="mr-4">User:{currentUser.name}</a>}
                        <a className="mr-4 hover:text-blue-600 transition-colors duration-300 whitespace-no-wrap" href="/UserProfile">UserProfile</a>
                        <a className="mr-4 hover:text-blue-600 transition-colors duration-300 whitespace-no-wrap" href="/PostCreate">PostLocation</a>
                        <button
                            className="font-bold hover:text-blue-800 transition-colors duration-300" // ボタンに適用するクラスを追加
                            type="button"
                            onClick={handleSignOut}
                        >
                            SignOut
                        </button>
                    </>
                    :
                    <>                        
                        <a className="mr-4 hover:text-blue-600 transition-colors duration-300 whitespace-no-wrap" href="/SignUp" style={{ margin: '5px' }}>SignUp</a>
                        <a className="mr-4 hover:text-blue-600 transition-colors duration-300 whitespace-no-wrap" href="/SignIn" style={{ margin: '5px' }}>SignIn</a>
                    </>
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;