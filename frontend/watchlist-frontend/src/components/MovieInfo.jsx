import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardMaker from "./CardMaker";


// this is where movie details are shown

export default function MovieInfo() {

    // **
    const [movieData, setMovieData] = useState(null);

    // for movie id
    const { id } = useParams();
    // fetching from backend
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/movies/${id}/`
                );
                const data = res.data

                const cleaned = {
                    title: data.title,
                    year: data.year,
                    overview: data.overview,
                    poster: data.poster
                };
                setMovieData(cleaned);
            } catch (err) {
                console.error("error fetching movie details", err);
            }
        };
        fetchMovie();
    }, [id]);
    if (!movieData) return <p>Loading...</p>

    return (
        <>
        <h2>{movieData?.title}</h2>
        {movieData ? <CardMaker cardData={movieData}/>:"Loading..."}
        </>
    )

}
