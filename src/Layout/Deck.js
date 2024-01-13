import React, { useState , useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";
import CardsList from "./CardsList";
import { deleteDeck } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from 'react-bootstrap/Breadcrumb';



const Deck = () => {
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
                console.log('deck data', deckData);
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

    const handleEditButton = () => {
        console.log('you got here with deck id', deckId);
        history.push(`/decks/${deckId}/edit`);
    }

    const handleStudyButton = () => {
        history.push(`/decks/${deckId}/study`);
    }

    const handleAddCardsButton = () => {
        history.push(`/decks/${deckId}/cards/new`);
    }

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

//01/10/2023 - this page goies to a 404, when i click on the edit deck button, it goes to 404

/**
 * <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <button onClick={() => handleEditButton()}>Edit</button>
                <button onClick={() => handleStudyButton()}>Study</button>
                <button onClick={() => handleAddCardsButton()}>Add Cards</button> 
                <button onClick={() => handleDeleteButton()}>Delete</button>
 */