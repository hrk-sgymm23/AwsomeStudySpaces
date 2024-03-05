import './App.css';
import React, { useEffect, useState } from 'react';
import client from './lib/api/client';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';

interface LocationPost {
    id: number;
    title: string;
    description: string;
    address: string;
}

const LocationPosts: React.FC = () => {
    const navigation = useNavigate()

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

    const removeLocationPost = async () => {
        try {
            const response = await client.delete(`location_posts/${locationPostId}`);
            if (response.status === 204) {
                console.log('LocationPost Create request successful:', response.data);
                navigation("/LocationPosts");
            }
        } catch (error) {
            console.error('POST request failed:', error);
        }
    }

    return (
        <div>

            {data && (
                <>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <p>{data.address}</p>
                </>
            )}
            {error && <p>{error}</p>}
            <h3 className="mr-5 hover:text-gray-900">
                <Link to="/PostUpdate" state={{ id: locationPostId }}>
                    LocationPostUpdate
                </Link>
            </h3><br />
            
            <button type="button" onClick={removeLocationPost}>この投稿を削除</button>
        </div>
    );
}

export default LocationPosts;
