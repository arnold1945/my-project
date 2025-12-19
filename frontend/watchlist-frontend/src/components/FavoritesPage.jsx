// standby. this is where we put the movie and show favorites

import React from "react";
import { useOutletContext } from "react-router-dom";
import CardMaker from "./CardMaker";

export default function FavoritesPage() {
    console.log('FavoritesPage')

    const { fave } = useOutletContext();

    return (
        <>
        <h2>MY FAVORITES</h2>
        {fave.length === 0 ?(
            <h3>NO FAVORITES YET!</h3>
        ) : (
            <div className="fave">
                {fave.map(f =>(
                    <CardMaker key={f.title} cardData={f}/>
                ))}
            </div>

        )}
        
        </>
    )
}