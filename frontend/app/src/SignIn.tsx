import React from 'react';
import { useEffect, useState, useContext } from 'react';

import { Link, useNavigate } from "react-router-dom";
import Header from './components/Header';
import { signIn } from './lib/api/auth';
import { AuthContext } from './App';

interface SignInParams {
    email: string,
    password: string
}

const SignIn: React.FC = () => {
    const blankParams = {
        email: '',
        password: '',
    }
    const navigation = useNavigate()
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
    const [SignInParams, setSignInParams] = useState<SignInParams>(blankParams)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInParams({
            ...SignInParams,
            [e.target.name]: e.target.value,
        });
    };

    const deleteHandler = () => {
        setSignInParams(blankParams)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signIn(SignInParams)
            if (response.status === 200) {
                localStorage.setItem('access-token', response.headers['access-token']);
                localStorage.setItem('client', response.headers['client']);
                localStorage.setItem('uid', response.headers['uid']);
                
                console.log('SignIn request successful:', response.data);
                alert("SignIn Success!!")
                setIsSignedIn(true)
                setCurrentUser(response.data.data)
                navigation("/UserProfile");
            }
        } catch (error) {
            console.error('SignIn request failed:', error);
            deleteHandler();
        }
    };


    return (
        <div>
            <Header />
            <h1>SignIn</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス:</label><br />
                    <input
                        type="text"
                        name="email"
                        value={SignInParams.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>パスワード</label><br />
                    <input
                        type="text"
                        name="password"
                        value={SignInParams.password}
                        onChange={handleChange}
                    />
                </div>
                    
                <button type="submit">送信</button><br />
                <button type="button" onClick={deleteHandler}>入力リセット</button>
            </form>
        </div>
    );
}

export default SignIn;