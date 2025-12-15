import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import HomePage from "./components/HomePage.jsx";
import MoviesPage from "./components/MoviesPage.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <HomePage/>,

            },
            {
         path: 'movies',
        element: <MoviesPage/>,

    },
        ],
       
    },
    
]);

export default router