import './App.css';
import React, { useEffect, useState } from 'react';
import client from './lib/api/client';
import { useParams } from 'react-router-dom';

interface LocationPost {
    id: number;
    title: string;
    description: string;
    address: string;
}

const LocationPosts: React.FC = () => {
    const { locationPostId } = useParams<{ locationPostId: string }>();
    const [data, setData] = useState<LocationPost | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        client.get<LocationPost>(`/location_posts/${locationPostId}`)
            .then((response) => {
                const responseData = response.data;
                setData(responseData);
            })
            .catch((error) => {
                console.error('HTTPリクエストエラー:', error);
                setError(error.message);
            });
    }, [locationPostId]);

    return (
        <div>
            <h1>LocationPost</h1>
            {data && (
                <>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <p>{data.address}</p>
                </>
            )}
            {error && <p>{error}</p>}
        </div>
    );
}

export default LocationPosts;
