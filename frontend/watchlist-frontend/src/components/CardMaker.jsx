import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useOutletContext } from "react-router-dom";


export default function CardMaker({cardData}) {

    const { inFavorites, fave, addToFavorites, removeFromFavorites } = useOutletContext();
    const { title, year, overview, poster } = cardData || {};

    return (
        <Card>
            <Card.Img
                variant="top"
                src={poster}
            />
            <Card.Body>
                <Card.Title><h3>{title}</h3></Card.Title>
                <Card.Text>{year}</Card.Text>
                <Card.Text>
                    {overview}
                </Card.Text>
            </Card.Body>

            {!inFavorites(cardData) ? (
                <Button className="fave-button"
                    onClick={() => addToFavorites(cardData)}
                    variant="primary"
                    disabled={fave.length >= 10}>
                    Add to Favorites
                </Button>
            ) : (
                <Button className="fave-button"

                    onClick={() => removeFromFavorites(cardData)}
                    variant="secondary"
                >
                    Remove From Favorites
                </Button>

            )}
        </Card>
    )
}