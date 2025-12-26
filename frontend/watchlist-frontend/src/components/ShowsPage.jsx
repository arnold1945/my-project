import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CardMaker from "./CardMaker";

export default function ShowsPage() {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const getShows = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/shows/popular/"
        );
        setShows(response.data);
      } catch (err) {
        console.error("Error getting shows from backend", err);
      }
    };
    getShows();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>POPULAR SHOWS</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {shows.map((show) => (
          <Link
            key={show.id}
            to={`/shows/${show.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <CardMaker cardData={show} />
          </Link>
        ))}
      </div>
    </div>
  );
}
