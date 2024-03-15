import './App.css';
import React, { useEffect, useState, useContext } from 'react';
import client from './lib/api/client';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App';

interface FormData {
    title: string;
    description: string;
    address: string;
}

const PostCreate: React.FC = () => {
    const navigation = useNavigate()
    const {currentUser, setCurrentUser} = useContext(AuthContext)

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
            const requestData = { ...formData, user_id: currentUser && currentUser.id }
            const response = await client.post('/location_posts', requestData);
            if (response.status === 201) {
                console.log('LocationPost Create request successful:', response.data);
                navigation("/LocationPosts");
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
