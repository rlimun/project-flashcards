import React, { useState , useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";
import CardsList from "./CardsList";
import { deleteDeck } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


/**
 * Functional Deck component that displays details of the deck, allows editing, studying, adding
 * cards, and deleting the deck
 * @returns {JSX.Element} React component for displaying and managing a deck
 */
function Deck(){
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({ cards: []});
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async() => {
            try {
                const deckData = await readDeck(deckId, abortController.signal);
               // const data = await response.json();
                setDeck(deckData);
            }
            catch(error){
                console.log('Error fetching deck ', error);
            }
        }
        fetchDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    /**
     * Handles the Edit button 
     * When a user clicks on the edit button, they are redirected to the edit page of that deck
     */
    const handleEditButton = () => {
        history.push(`/decks/${deckId}/edit`);
    }

    /**
     * Handles the Study button 
     * When a user clicks on the Study button, they are redirected to the study page of that deck
     */
    const handleStudyButton = () => {
        history.push(`/decks/${deckId}/study`);
    }

    /**
     * Handles the Add Card button 
     * When a user clicks on the Add Card button, they are redirected to the Add cards page of that deck
     */
    const handleAddCardsButton = () => {
        history.push(`/decks/${deckId}/cards/new`);
    }

    /**
     * Deletes the deck
     */
    const handleDeleteButton = async () => {
        const confirmed = window.confirm('Delete this deck? You will not be able to recover it');
        if (confirmed) {
            try {
                await deleteDeck(deckId);
                history.push('/');
            } catch(error){
                console.error("Error deleting deck", error);
            }
        }
    };

    const breadCrumb = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>{deck.name}</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <div>
            <div>
                {breadCrumb}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <h3>Deck</h3>
                </div>
                <div
                    className="modal show"
                    style={{ display: 'block', position: 'initial' }}
                    >
                    <Modal.Dialog>
                        <Modal.Header>
                        <Modal.Title>{deck.name}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                        <p>{deck.description}</p>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleEditButton()}>Edit</Button>
                        <Button variant="warning" onClick={() => handleStudyButton()}>Study</Button>
                        <Button variant="success" onClick={() => handleAddCardsButton()}>Add Card</Button>
                        <Button variant="danger" onClick={() => handleDeleteButton()}>Delete</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </div>
            </div>
            <div>
                <CardsList deck={deck} setDeck={setDeck}/>
            </div>
        </div>
    )
}

export default Deck;