import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { deleteCard, readDeck } from "../utils/api";

/**
 * Component to display a list of cards for a specific deck
 * @param {Object} props.deck - The deck object containing the cards to be displayed
 * @param {function} props.setDeck - Function to update the deck state
 * @returns {JSX.Element} React component
 */
function CardsList({deck, setDeck}) {
    const history = useHistory();
    const { deckId } = useParams();
    
    // fetches the deck and updates the state
    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async() => {
            try {
                setDeck(await readDeck(deckId, abortController.signal));
            }
            catch(error){
                console.log('Error fetching decks', error);
            }
        }
        fetchDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId, setDeck]);

    /**
     * Redirects to the edit page of that card
     * @param {string} cardId - the Id of the card to edit
     */
    const handleCardEditButton = async(cardId) => {
        history.push(`/decks/${deckId}/cards/${cardId}/edit`)
    }

    /**
     * Deletes the card and updates the deck
     * @param {string} cardId - the ID of the card to delete
     */
    const handleCardDeleteButton = async(cardId) => {
        const confirmed = window.confirm('Delete this card? You will not be able to recover it');
        const abortController = new AbortController();
        if (confirmed) {
            try {
                await deleteCard(cardId, abortController.signal);
                const updatedDeck = await readDeck(deck.id, abortController.signal);
                setDeck(updatedDeck);
            } catch(error){
                console.error("Error deleting card", error);
            }
        }
    }

    return (
        <div>
            <h3>Cards</h3>
            { deck.cards.map((card, index) => (
                <div key={card.id}>
                    <h3>Card {index + 1} of {deck.cards.length}</h3>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <button onClick={() => handleCardEditButton(card.id)}>Edit</button>
                    <button onClick={() => handleCardDeleteButton(card.id)}>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default CardsList;