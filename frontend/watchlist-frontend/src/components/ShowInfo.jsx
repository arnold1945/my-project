import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardMaker from "./CardMaker";


export default function ShowInfo() {

    const [showData, setShowData] = useState(null);

    const { id } = useParams();
    // fetching from backend
    useEffect(() => {
        const fetchShow = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/shows/${id}/`
                );
                const data = res.data

                const cleaned = {
                    title: data.title,
                    year: data.year,
                    overview: data.overview,
                    poster: data.poster
                };
                setShowData(cleaned);
            } catch (err) {
                console.error("error fetching show details", err);
            }
        }
        fetchShow();
    }, [id]);

    if (!showData) return <p>Loading...</p>

    return (
        <>
            <h2>{showData?.title}</h2>
            {showData ? <CardMaker cardData={showData} /> : "Loading..."}
        </>


    )
}