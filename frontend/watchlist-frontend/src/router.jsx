import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import MoviesPage from "./components/MoviesPage.jsx";
import ShowsPage from "./components/ShowsPage.jsx";
import LoginSignup from "./components/LoginSignup.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import MovieInfo from "./components/MovieInfo.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,

            },
            {
                path: 'movies',
                element: <MoviesPage />,

            },
            {
                path: 'shows',
                element: <ShowsPage/>,

            },
            {
                path: 'loginsignup',
                element: <LoginSignup/>
            },
            {
                path: 'profile',
                element: <ProfilePage/>
            },
            {
                path: 'movies/:id',
                element: <MovieInfo/>,
            },
        ],

    },

]);

export default router