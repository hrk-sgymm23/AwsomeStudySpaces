import './App.css';
import React, { useEffect, useState } from 'react';
import client from './lib/api/client';
import Header from './components/Header';
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface FormData {
    title: string;
    description: string;
    address: string;
}

interface State {
    id: number;
}

const PostUpdate: React.FC = () => {
    const Location = useLocation();
    const navigation = useNavigate()

    const { id } = Location.state as State;
    const [data, setData] = useState<FormData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        client.get<FormData>(`/location_posts/${id}`)
            .then((response) => {
                const responseData = response.data;
                setFormData(responseData);
            })
            .catch((error) => {
                console.error('HTTPリクエストエラー:', error);
                setError(error.message);
            });
    }, []);

    
    const [formData, setFormData] = useState<FormData>({
        title: '',
        address: '',
        description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const deleteHandler = () => {
        setFormData({
            title: '',
            address: '',
            description: ''
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await client.put(`/location_posts/${id}`, formData);
            console.log('POST request successful:', response.data);
            if (response.status === 200) {
                navigation("/");
            }
        } catch (error) {
            console.error('POST request failed:', error);
            deleteHandler();
        }
    };

    const moveRecession = () => {
        navigation(-1);
    }

return (
    <div>
        <Header />
        <h1>PostUpdate</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>タイトル:</label><br />
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>場所:</label><br />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>詳細文:</label><br />
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
                </div>
                
                <button type="submit">送信</button><br />
                <button type="button" onClick={deleteHandler}>入力リセット</button><br />
                <button type="button" onClick={moveRecession}>もどる</button>
        </form>
    </div>
    );
}

export default PostUpdate;
