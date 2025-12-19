import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar';
import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext";



function App() {
  const { isAuthenticated, token } = useAuth();
  const [fave, setFave] = useState([]);
  
  const inFavorites = (item) =>
    fave.some((f) => f.title === item.title);
  const addToFavorites = async (item) => {
    const type = item.media_type

    console.log("ADDING", item, item.api_id, token);


    await axios.post(
      `http://127.0.0.1:8000/favorites/${type}s/${item.api_id}/add/`,
      {},
      { headers: { Authorization: `Token ${token}` } }
    );

    // re-fetch favorites
    const res = await axios.get("http://127.0.0.1:8000/favorites/", {
      headers: { Authorization: `Token ${token}` },
    });
    setFave([...res.data.movies, ...res.data.shows]);
  };

  const removeFromFavorites = async (item) => {
    const type = item.media_type


    await axios.delete(
      `http://127.0.0.1:8000/favorites/${type}s/${item.api_id}/remove/`,
      { headers: { Authorization: `Token ${token}` } }
    );

    // re-fetch favorites
    const res = await axios.get("http://127.0.0.1:8000/favorites/", {
      headers: { Authorization: `Token ${token}` },
    });
    setFave([...res.data.movies, ...res.data.shows]);
  };



  useEffect(() => {
    if (!isAuthenticated) {
      setFave([]);
      return;
    }

    axios
      .get("http://127.0.0.1:8000/favorites/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setFave([
          ...res.data.movies,
          ...res.data.shows,
        ]);
      })
      .catch(() => setFave([]));
  }, [isAuthenticated, token]);





  return (
    <><NavBar />
      <Outlet
        context={{
          fave,
          inFavorites,
          addToFavorites,
          removeFromFavorites,
        }}
      />
    </>
  );
}

export default App;
