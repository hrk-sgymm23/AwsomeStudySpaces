import { useEffect, useState } from "react";
import client from '../lib/api/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DetailPost from "../DetailPost";

interface LocationPosts {
    id: number;
    title: string;
    description: string;
    address: string;
}

function Card() {
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

    return (
            <div>
                {data && data.map((item) => (
                    <div>
                        <h2>
                            {item.title}
                            <Routes>
                                <Route path="/DetailPost" element={ <DetailPost /> } /> {/*RouteにHomeを設定する*/}
                            </Routes>
                        </h2>
                        <ul style={{ listStyleType: 'none'}}>
                            <li>{item.id}</li>
                            <li>{item.address}</li>
                        </ul>
                    </div>
                ))}
            </div>
    );
}

export default Card;