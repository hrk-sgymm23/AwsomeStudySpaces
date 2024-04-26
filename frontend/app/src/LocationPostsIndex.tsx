import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from './lib/api/client';
import React from 'react';

interface LocationPosts {
    id: number;
    title: string;
    description: string;
    address: string;
    location_image: string
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
        <div className='flex flex-wrap justify-center'>
            {data && data.map((item) => (
                <Link to={ `/LocationPosts/${ item.id }` } key={item.id}>
                    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4">
                        <img 
                            className='object-cover h-72 w-96' 
                            src={"http://localhost:3001/" + item.location_image} 
                            alt={item.title} 
                        />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{item.title}</div>
                        </div>
                    </div>
                </Link>
            ))}
            {error && <p>{error}</p>}
        </div>
    );
}

export default LocationPostsIndex;