import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from './lib/api/client';
import React from 'react';

interface LocationPosts {
    id: number;
    title: string;
    description: string;
    address: string;
}

const LocationPostsIndex = () => {
    const [data, setData] = useState< LocationPosts[] | null >(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        client.get<LocationPosts[]>('/location_posts')
        .then((response) => {
            const responseData = response.data;
            setData(responseData);
        })
        .catch((error) => {
            console.error('HTTPリクエストエラー:', error);
            setError(error.message);
        });
    }, []);

    return(
        <div>
            {data && data.map((item) => (
                <div>
                    <h2>
                        <Link to={ `/LocationPosts/${ item.id }` }>
                            {item.title}
                        </Link>
                    </h2>
                    <h3>{item.address}</h3>
                    <ul style={{ listStyleType: 'none'}}>
                        <li>{item.description}</li>
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default LocationPostsIndex;