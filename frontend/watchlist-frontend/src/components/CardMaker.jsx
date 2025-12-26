import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useOutletContext } from "react-router-dom";

export default function CardMaker({ cardData }) {
  const { inFavorites, fave, addToFavorites, removeFromFavorites } =
    useOutletContext();

  const { title, year, overview } = cardData || {};

  
  const poster =
    cardData?.poster ||
    cardData?.poster_path ||
    cardData?.image?.original ||
    cardData?.image?.medium ||
    null;

  const posterUrl = poster
    ? poster.startsWith("http")
      ? poster
      : `https://image.tmdb.org/t/p/w500${poster}`
    : "https://via.placeholder.com/500x750?text=No+Image";



return (
  <Card className="p-3">
    
    {cardData && inFavorites && (
      !inFavorites(cardData) ? (
        <Button
          onClick={() => addToFavorites(cardData)}
          variant="primary"
          disabled={fave.length >= 10}
          className="mb-3"
        >
          Add to Favorites
        </Button>
      ) : (
        <Button
          onClick={() => removeFromFavorites(cardData)}
          variant="secondary"
          className="mb-3"
        >
          Remove From Favorites
        </Button>
      )
    )}

    
    <div className="d-flex align-items-start gap-3">
     
      <Card.Img
        src={posterUrl}
        style={{ width: "150px", height: "auto" }}
      />

      
      <Card.Body className="p-0">
        <Card.Title>
          <h3 className="mb-1">{title}</h3>
        </Card.Title>

        <Card.Text className="text-muted mb-2">
          {year}
        </Card.Text>

        <Card.Text
          dangerouslySetInnerHTML={{ __html: overview }}
        />
      </Card.Body>
    </div>
  </Card>
);
}