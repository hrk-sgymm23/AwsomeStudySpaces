import React, { useCallback, useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import { AuthContext } from './App';
import client from './lib/api/client';
import { error } from 'console';

interface postSummary {
    id: number;
    title: string;
    created_at: string;
}

function UserProfile() {
    const { isSignedIn, setIsSignedIn, currentUser, setCurrentUser } = useContext(AuthContext)
    const [dataSummery, setDataSummary] = useState< postSummary[] | null >(null);

    useEffect(() => {
        // idがない時はリクエストしない
        if (currentUser?.id) {
            const userId = currentUser?.id
            client.get<postSummary[]>(`/location_posts/${ userId }/get_users_posts`)
            .then((response) => {
                const responseData = response.data;
                setDataSummary(responseData);
            })
            .catch((error) => {
                console.error('http error:', error)
                alert('my post get failed')
            })
        }
    }, [currentUser]) //currentUserを監視

    console.log(currentUser);

    return (
        <div>
            <Header />
            <h1 className='p-4 text-4xl font-bold'>UserProfile</h1>
            {currentUser && (
                <div className='p-4 text-2xl font-bold'>
                    <h2>{ currentUser.name }</h2>
                    <h2>{ currentUser.email }</h2>
                </div>
            )}
            <h3 className='p-4 text-xl font-bold'>My Posts</h3>
            {dataSummery && dataSummery.map((summary) => (
                <div className='p-4 text-l font-bold'>
                    <h3>
                        <Link to={ `/LocationPosts/${ summary.id }` }>
                            {summary.title}
                        </Link>
                    </h3>
                    <ul style={{ listStyleType: 'none'}}>
                        <li>{summary.created_at}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default UserProfile;