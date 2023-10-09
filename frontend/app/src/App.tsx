import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from "react";

interface ApiResponse {
  item: string;
}

function App() {
  const [data, setData] = useState< ApiResponse | null >(null);
  useEffect(() => {
    // HTTPリクエストを実行し、データを取得する
    axios.get<ApiResponse>('https://v8vdln4u5j.execute-api.ap-northeast-1.amazonaws.com/Prod/hello/')
      .then((response) => {
        // レスポンスからデータを取り出す
        const responseData = response.data;

        // データを設定
        setData(responseData);
      })
      .catch((error) => {
        console.error('HTTPリクエストエラー:', error);
        setData(error.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {data && (
          <div>
            <p>Data from API:</p>
            <p>{data.item}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
