import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import client from './lib/api/client';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './App';

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
    const { isSignedIn, currentUser } = useContext(AuthContext)

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

    const moveRecession = () => {
        navigation(-1);
    }

    return (
        <div>
            <div className='pt-20 flex justify-center w-screen'>
                <div className='p-4 max-w-sm rounded-lg overflow-hidden shadow-lg'>
                    {data?.location_image && (
                        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg m-4">
                            <img
                                className='object-cover h-120 w-96 mx-auto' // mx-auto で水平方向に中央揃え
                                src={"http://localhost:3001/" + data.location_image} 
                                alt={data.title} 
                            />
                        </div>
                    )}
                    {data && (
                        <div className="px-6 py-4">
                            <div className='font-bold mb-2'>
                                <h2 className='text-xl p-1'>{data.title}</h2>
                                <p className='text-l p-1'>{data.description}</p>
                                <p className='text-l p-1'>場所:{data.address}</p>
                            </div>
                        </div>
                    )}
                    {error && <p>{error}</p>}
                    {isSignedIn && (data?.user_id === currentUser?.id) && (
                        <div>
                            <h3 className="hover:text-gray-900 font-bold text-xl">
                                <Link to="/PostUpdate" state={{ id: locationPostId }}>
                                    投稿を編集する
                                </Link>
                            </h3><br />
                            <button type="button" onClick={removeLocationPost}>投稿を削除</button>
                        </div>
                    )}
                </div>
            </div>
            <button className='
                    m-2
                    border-solid
                    border-2
                    border-sky-500
                    font-bold
                    text-xl
                    rounded-2xl
                    p-2
                '
            type="button" onClick={moveRecession}>もどる</button>
        </div>
        
    );
}


export default LocationPosts;
