import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function NavBar() {
    const navigate = useNavigate();
    const {isAuthenticated,logout} = useAuth();

    return (
        <nav>
      <h1>The Watch List Project</h1>

      <div>
        <Link to = "/">Home</Link>
        <br></br>
        <Link to = "/movies">Movies</Link>
        <br></br>
        <Link to = "/shows">Shows</Link>
        <br></br>
        {/* just setting this up for now. ROUTER NOT SETUP YET FOR THIS */}
        {isAuthenticated ? (
          <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
          </>

        ): (
          <Link to = "/loginsignup">Login/Signup</Link>
          

        )}
        

      </div>
    </nav>

    )

}

