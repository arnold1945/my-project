import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function ShowInfo() {

    const [showData, setShowData] = useState(null);

    const { id } = useParams();

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
        <div className="p-6">
            <h2 className="text-2xl font-bold">
                {showData.title} ({showData.year})
            </h2>

            {/* poster */}
            <div className="flex items-start gap-6">
                {showData.poster && (
                    <img
                        src={showData.poster}
                        alt={showData.title}
                        className="w-64 flex-shrink-0 rounded"
                    />
                )}

                {/* description */}
                <div
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: showData.overview }}
                />

            </div>
        </div>


    )
}