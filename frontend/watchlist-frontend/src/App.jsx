import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar';



function App() {
  const [fave, setFave] = useState([]);

  const inFavorites = (item) => 
    fave.some((f) => f.title === item.title);

  const addToFavorites = (item) =>
    setFave([...fave, item]);

  const removeFromFavorites = (item) =>
    setFave(fave.filter((f) => f.title !== item.title));
  
  return (
  <><NavBar/>
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
