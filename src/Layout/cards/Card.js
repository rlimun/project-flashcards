import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useHistory, useParams } from "react-router-dom";


function Card({ card, onDeleteCard }){
    const history = useHistory();
    const { deckId } = useParams();

        /**
     * Redirects to the edit page of that card
     * @param {string} cardId - the Id of the card to edit
     */
        const handleCardEditButton = async(cardId) => {
            history.push(`/decks/${deckId}/cards/${cardId}/edit`)
        }
    
        const handleDeleteClick = () => {
            onDeleteCard(card.id);
          };
    
    return (
        <div>
            <Modal.Dialog>
            <Modal.Body>
                <p>{card.front}</p>
                <p>{card.back}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCardEditButton()}>
                    Edit
                </Button>
                <Button variant="primary" onClick={() => handleDeleteClick()}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal.Dialog>
    </div>
    )
}

export default Card;