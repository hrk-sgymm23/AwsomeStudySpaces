import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import client from './lib/api/client';

import { Link, useNavigate } from "react-router-dom";
import Header from './components/Header';
import { signUp } from './lib/api/auth';
import { AuthContext } from './App';

interface SignUpParams {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
}

const SignUp: React.FC = () => {
    const blankParams = {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }
    const navigation = useNavigate()
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)
    const [SignUpParams, setSignUpParams] = useState<SignUpParams>(blankParams)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpParams({
            ...SignUpParams,
            [e.target.name]: e.target.value,
        });
    };

    const deleteHandler = () => {
        setSignUpParams(blankParams)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signUp(SignUpParams)
            if (response.status === 200) {
                localStorage.setItem("access-token", response.headers['access-token']);
                localStorage.setItem("client", response.headers['client']);
                localStorage.setItem("uid", response.headers['uid']);

                console.log('SignUp request successful:', response.data);
                alert("SignUp Success!!")
                setIsSignedIn(true)
                setCurrentUser(response.data.data)
                navigation("/UserProfile");
            }
        } catch (error) {
            console.error('SignUp request failed:', error);
            deleteHandler();
        }
    };


    return (
        <div>
            <Header />
            <h1>Sign UP</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ユーザー名:</label><br />
                    <input
                        type="text"
                        name="name"
                        value={SignUpParams.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>メールアドレス:</label><br />
                    <input
                        type="text"
                        name="email"
                        value={SignUpParams.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>パスワード</label><br />
                    <input
                        type="text"
                        name="password"
                        value={SignUpParams.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>パスワード(確認)</label><br />
                    <input
                        type="text"
                        name="passwordConfirmation"
                        value={SignUpParams.passwordConfirmation}
                        onChange={handleChange}
                    />
                </div>
                    
                <button type="submit">送信</button><br />
                <button type="button" onClick={deleteHandler}>入力リセット</button>
            </form>
        </div>
    );
}

export default SignUp;