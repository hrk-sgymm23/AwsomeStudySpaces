import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import client from './lib/api/client';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './App';
import { title } from 'process';

interface LocationPost {
    id: number;
    title: string;
    description: string;
    address: string;
    user_id: number;
    location_image: string
}

const LocationPosts: React.FC = () => {
    const navigation = useNavigate()

    const { locationPostId } = useParams<{ locationPostId: string }>();
    const [data, setData] = useState<LocationPost | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { setIsSignedIn, setCurrentUser, isSignedIn, currentUser } = useContext(AuthContext)

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
            
            {data?.location_image && (
                <div>
                    <img src={"http://localhost:3001/" + data.location_image} key={data.title} style={{ maxWidth: '600px', maxHeight: '600px', margin: '5px' }}/>
                </div>
            )}
            
            {error && <p>{error}</p>}
            {isSignedIn && (data?.user_id == currentUser?.id) && (
                <div>
                    <h3 className="mr-5 hover:text-gray-900">
                        <Link to="/PostUpdate" state={{ id: locationPostId }}>
                            LocationPostUpdate
                        </Link>
                    </h3><br />
                    <button type="button" onClick={removeLocationPost}>この投稿を削除</button>
                </div>
            )}
        </div>
    );
}

export default LocationPosts;
