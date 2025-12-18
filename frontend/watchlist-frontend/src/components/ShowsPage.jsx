import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";


export default function ShowsPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {

    const getShows = async () => {
      try{
        const response1 = await axios.get(
          "http://127.0.0.1:8000/shows/popular/"
        );
        setShows(response1.data)
      } catch (err) {
        console.error("Error getting shows from backend", err);

      }
    };
    getShows();
  }, []);

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>POPULAR SHOWS</h1>
      

      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            {/* setting the titles as hyperlinks */}
           <Link to={`shows/popular/${show.id}`}> {show.title} ({show.year})</Link>
          </li>
        ))}
      </ul>
    </div>
  )


}