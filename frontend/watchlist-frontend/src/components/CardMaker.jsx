import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useOutletContext } from "react-router-dom";


export default function CardMaker({ cardData }) {

    const { inFavorites, fave, addToFavorites, removeFromFavorites } = useOutletContext();
    const { title, year, overview, poster } = cardData || {};

    return (
        <Card>
            {cardData && inFavorites && (
                !inFavorites(cardData) ? (
                    <Button
                        onClick={() => addToFavorites(cardData)}
                        variant="primary"
                        disabled={fave.length >= 10}
                    >
                        Add to Favorites
                    </Button>
                ) : (
                    <Button
                        onClick={() => removeFromFavorites(cardData)}
                        variant="secondary"
                    >
                        Remove From Favorites
                    </Button>
                )
            )}
            <Card.Img
                variant="top"
                src={poster}
            />
            <Card.Body>
                <Card.Title><h3>{title}</h3></Card.Title>
                <Card.Text>{year}</Card.Text>
                <Card.Text
                    dangerouslySetInnerHTML={{ __html: overview }}
                />

            </Card.Body>

            

        </Card>
    )
}