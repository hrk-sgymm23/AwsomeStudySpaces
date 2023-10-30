import './App.css';
import { useEffect, useState } from "react";
import client from './lib/api/client';
import Header from './components/Header';
import Footer from './components/Footer';

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
      <header className="App-header">
        {data && (
          <div>
            <h3>Data from RailsAPI:</h3>
            <ul>
              {data.map((item) => (
                <li key={item.id}>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        {error && <p>Error: {error}</p>}
      </header>
      <Footer />
    </div>
  );
}

export default App;
