import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


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
        <div className="p-6">
            <h2 className="text-2xl font-bold">
                {movieData.title} ({movieData.year})
            </h2>

            {/* poster */}
            <div className="flex items-start gap-6">
            {movieData.poster && (
                <img
                    src={movieData.poster}
                    alt={movieData.title}
                    className="w-64 flex-shrink-0 rounded"
                />
            )}

            {/* description */}
            <p className="leading-relaxed">{movieData.overview}</p>
        </div>
        </div>
    )

}
