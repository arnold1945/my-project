import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardMaker from "./CardMaker";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/movies/popular/"
        );
        setMovies(response.data);
      } catch (err) {
        console.error("Error getting movies from backend", err);
      }
    };
    getMovies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>POPULAR MOVIES</h1>

     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to={`/movies/${movie.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardMaker cardData={movie} />
          </Link>
        ))}
      </div>
    </div>
  );
}
