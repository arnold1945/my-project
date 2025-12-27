import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  // for tmdb search
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // for tvmaze searcgh
  const [showQuery, setShowQuery] = useState("");
  const [showResults, setShowResults] = useState([]);
  const [showShowDropdown, setShowShowDropdown] = useState(false);

  // TMDB search effect
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

        setResults([...moviesRes.data, ...showsRes.data]);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search failed", err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  // TVMAZE show search effect
  useEffect(() => {
    if (!showQuery.trim()) {
      setShowResults([]);
      setShowShowDropdown(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(
          `https://api.tvmaze.com/search/shows?q=${showQuery}`
        );
        setShowResults(res.data);
        setShowShowDropdown(true);
      } catch (err) {
        console.error("TVMaze search failed", err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [showQuery]);

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

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ position: "relative", display: "flex", gap: "8px" }}>
          {/* tmdb search */}
          <input
            type="text"
            placeholder="Search movies (TMDB)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          />

          {/* tvmaze search */}
          <input
            type="text"
            placeholder="Search TV shows (TVMaze)"
            value={showQuery}
            onChange={(e) => setShowQuery(e.target.value)}
            style={{
              padding: "6px 10px",
              borderRadius: "6px",
              border: "none",
              outline: "none",
            }}
          />

          {/* tmdb driop down styling */}
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
              {results.map((item) => (
                <div
                  key={`${item.media_type}-${item.api_id}`}
                  onClick={() => {
                    setQuery("");
                    setShowDropdown(false);

                    if (item.media_type === "movie") {
                      navigate(`/movies/${item.api_id}`);
                    } else {
                      navigate(`/shows/${item.api_id}`);
                    }
                  }}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  {item.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                      alt={item.title}
                      style={{ width: "40px" }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: "600" }}>{item.title}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>
                      {item.media_type === "movie" ? "Movie" : "TV Show"}
                    </div>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {item.year}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* styling tvmaze dropdown */}
          {showShowDropdown && showResults.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "320px",
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
              {showResults.map((r) => (
                <div
                  key={r.show.id}
                  onClick={() => {
                    setShowQuery("");
                    setShowShowDropdown(false);
                    navigate(`/shows/${r.show.id}`);
                  }}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "8px",
                    cursor: "pointer",
                  }}
                >
                  {r.show.image?.medium && (
                    <img
                      src={r.show.image.medium}
                      alt={r.show.name}
                      style={{ width: "40px" }}
                    />
                  )}
                  <div>
                    <div style={{ fontWeight: "600" }}>{r.show.name}</div>
                    <div style={{ fontSize: "11px", color: "#888" }}>
                      TV Show
                    </div>
                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {r.show.premiered
                        ? r.show.premiered.slice(0, 4)
                        : ""}
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
            <button onClick={logout} style={logoutButtonStyle}>
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

