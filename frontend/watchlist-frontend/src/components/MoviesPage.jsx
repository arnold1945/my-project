import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useOutletContext } from "react-router-dom";


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {

    const getMovies = async () => {
      try{
        const response1 = await axios.get(
          "http://127.0.0.1:8000/movies/popular/"
        );
        setMovies(response1.data)
      } catch (err) {
        console.error("Error getting movies from backend", err);

      }
    };
    getMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  )


}