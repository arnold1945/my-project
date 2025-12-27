import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const [moviesRes, showsRes] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/movies/search/?q=${query}`),
          axios.get(`http://127.0.0.1:8000/shows/search/?q=${query}`),
        ]);

        const combinedResults = [
          ...moviesRes.data,
          ...showsRes.data,
        ];

        setResults(combinedResults);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);



  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        backgroundColor: "#111827",
        color: "#ffffff",
      }}
    >

      <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
        The Watch List Project
      </h1>


      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
      >
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search movies and shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          />

          {showDropdown && results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "300px",
                backgroundColor: "#ffffff",
                color: "#000000",
                borderRadius: "6px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                maxHeight: "400px",
                overflowY: "auto",
                zIndex: 999,
              }}
            >
              {results.map((movie) => (
                <div
                  key={movie.api_id}
                  onClick={async () => {
                    setQuery("");
                    setShowDropdown(false);

                    // Movies: unchanged
                    if (movie.media_type === "movie") {
                      navigate(`/movies/${movie.api_id}`);
                      return;
                    }

                    // Shows: resolve TMDB -> TVMaze
                    try {
                      navigate(`/shows/${movie.api_id}`);

                    } catch (err) {
                      console.error("Failed to resolve show ID", err);
                    }
                  }}




                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: "40px" }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: "600" }}>{movie.title}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>
                      {movie.media_type === "movie" ? "Movie" : "TV Show"}
                    </div>


                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {movie.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/movies">Movies</Link>
        <Link style={linkStyle} to="/shows">Shows</Link>

        {isAuthenticated ? (
          <>
            <Link style={linkStyle} to="/favorites">Favorites</Link>
            <Link style={linkStyle} to="/profile">Profile</Link>
            <button
              onClick={logout}
              style={logoutButtonStyle}
            >
              Logout
            </button>
          </>
        ) : (
          <Link style={linkStyle} to="/loginsignup">
            Login / Signup
          </Link>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontWeight: "500",
};

const logoutButtonStyle = {
  padding: "6px 12px",
  backgroundColor: "#ef4444",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};
