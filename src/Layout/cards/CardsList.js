import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Card from './Card';
import { deleteCard, readDeck } from "../../utils/api";

/**
 * Component to display a list of cards for a specific deck
 * @param {Object} props.deck - The deck object containing the cards to be displayed
 * @param {function} props.setDeck - Function to update the deck state
 * @returns {JSX.Element} React component
 */
function CardsList({deck, setDeck}) {
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

    const updateDeck = async () => {
        const abortController = new AbortController();
        try {
          const updatedDeck = await readDeck(deck.id, abortController.signal);
          setDeck(updatedDeck);
        } catch (error) {
          console.error('Error updating deck', error);
        }
      };

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <h3>Cards</h3>
            </div>
            <div
            className="modal show"
            style={{ display: 'block', position: 'initial' }}
            >
                { deck.cards.map((card, index) => (
                    <div key={card.id}>
                        <div className="cardContainer">
                            <Modal.Dialog>
                                <Modal.Header>
                                    <Modal.Title>
                                        Card {index + 1} of {deck.cards.length}
                                    </Modal.Title>
                                </Modal.Header>
                                <Card
                                    card={card}
                                    setDeck={updateDeck}
                                    onDeleteCard={handleCardDeleteButton}
                                />
                        </Modal.Dialog>
                        </div>
                </div>
            ))}
            </div>
      </div>
    )
}

export default CardsList;
