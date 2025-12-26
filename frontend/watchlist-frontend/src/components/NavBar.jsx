import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

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
