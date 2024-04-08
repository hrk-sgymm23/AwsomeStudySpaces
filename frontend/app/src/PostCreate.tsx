import './App.css';
import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone';
import client from './lib/api/client';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './App';

interface FormData {
    title: string;
    description: string;
    address: string;
    location_image: File | null;
}

const PostCreate: React.FC = () => {
    const navigation = useNavigate()
    const {currentUser, setCurrentUser} = useContext(AuthContext)
    const [previewImagePaths, setPreviewImagePaths] = useState<string[]>();
    const [files, setFiles] = useState<File[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        // TODO: 画像は一枚のため、map処理は必要ない
        const newFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ 
        onDrop,
        accept: {
            'image/png': ['.png', '.jpg', '.jpeg'],
        }
    });

    const [formData, setFormData] = useState<FormData>({ 
        title: '',
        address: '',
        description: '',
        location_image: null
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
            description: '',
            location_image: null
        })
        setFiles([])
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const requestData = new FormData();
            requestData.append('location_post[title]', formData.title);
            requestData.append('location_post[description]', formData.description);
            requestData.append('location_post[address]', formData.address);
            requestData.append('location_post[user_id]', currentUser ? currentUser.id.toString() : '');
            if (files[0]){
                requestData.append('location_post[location_image]', files[0])    
            }    
            console.log(requestData)

            const response = await client.post('/location_posts', requestData);
            if (response.status === 201 ||response.status === 204) {
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
        <h1 className='
                font-bold
                text-3xl
        '>投稿作成</h1>
        <form onSubmit={handleSubmit}>
            <div className='
                    p-4
                    font-bold
                    text-xl
            '>
                <label>タイトル</label><br />
                <input
                    className='
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                    '
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className='
                p-4
                font-bold
                text-xl
            '>
                <label>場所</label><br />
                <input
                    className='
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                    '
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                />
            </div>
            <div className='
                    p-4
                    font-bold
                    text-xl
            '>
                <label>詳細文:</label><br />
                <input
                    className='
                        p-2
                        border-solid
                        border-2
                        border-sky-500
                        rounded-lg
                    '
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className='
                    font-bold
                    text-xl
            '>
                <label>画像選択</label><br />
            </div>
            {files.length == 0 && (
                <div className='
                    flex
                    justify-center
                    items-center
                    h-72
                '>
                    <div {...getRootProps()}
                        className='
                            flex
                            justify-center
                            items-center
                            w-72
                            h-72
                            border-solid
                            border-2
                            p-10
                            rounded-lg
                    '>
                        <input {...getInputProps()} />
                        <p>ここにファイルをドラッグ&ドロップまたは
                            <br />
                            クリックしてファイルを選択してください。
                            <br />
                            ※画像は一枚のみ選択可能
                        </p><br />
                    </div>
                </div>
            )}
            <div className='
                flex
                justify-center
                items-center
            '>
            {files.map(file => {
                if (file.type.startsWith('image/')) {
                    return <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                key={file.name}
                                style={{ maxWidth: '300px', maxHeight: '300px', margin: '5px' }}
                            />;
                } if (file.type === 'application/pdf') {
                    return <iframe src={URL.createObjectURL(file)} title={file.name} key={file.name} style={{ maxWidth: '300px', maxHeight: '300px', margin: '5px' }} />;
                } 
                    return null;  
            })}
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
            type="submit">送信</button><br />
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
            type="button" onClick={deleteHandler}>入力リセット</button>
        </form>
    </div>
    );
}

export default PostCreate;
