import './App.css';
import React, { useEffect, useState } from 'react';
import client from './lib/api/client';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';

interface FormData {
    title: string;
    description: string;
    address: string;
}

const PostCreate: React.FC = () => {
    const navigation = useNavigate()

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
            const response = await client.post('/location_posts', formData);
            console.log('POST request successful:', response.data);
            if (response.status === 201) {
                navigation("/");
            }
        } catch (error) {
            console.error('POST request failed:', error);
            deleteHandler();
        }
    };

return (
    <div>
        <Header />
        <h1>PostCreate</h1>
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
                <button type="button" onClick={deleteHandler}>入力リセット</button>
        </form>
    </div>
    );
}

export default PostCreate;
