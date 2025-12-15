import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function NavBar() {
    const navigate = useNavigate();

    return (
        <nav>
      <h1>The Watch List Project</h1>

      <div>
        <Link to = "/">Home</Link>
        <br></br>
        <Link to = "/movies">Movies</Link>
        <br></br>
        <Link to = "/Shows">Shows</Link>

      </div>
    </nav>

    )

}

