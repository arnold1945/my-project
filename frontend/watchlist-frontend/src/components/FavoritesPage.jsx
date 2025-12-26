import React from "react";
import { useOutletContext } from "react-router-dom";
import CardMaker from "./CardMaker";

export default function FavoritesPage() {
  const { fave } = useOutletContext();

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>MY FAVORITES</h2>

      {fave.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>NO FAVORITES YET!</h3>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {fave.map((f) => (
            <div
              key={`${f.media_type}-${f.api_id || f.id}`}
              style={{
                
                overflow: "hidden",
              }}
              className="favorites-card"
            >
              <CardMaker cardData={f} />
            </div>
          ))}
        </div>
      )}

      
      <style>
        {`
          .favorites-card img {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
