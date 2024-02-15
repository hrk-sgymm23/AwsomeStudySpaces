import './App.css';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';
import Body from './components/body';
import Footer from './components/Footer';
import Card from './components/Card';

interface LocationPosts {
  id: number;
  title: string;
  description: string;
}

function App() {
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
    <div className="App">
      <Header />
      <Card />
      <Footer />
    </div>
  );
}

export default App;
