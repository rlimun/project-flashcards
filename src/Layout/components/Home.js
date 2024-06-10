import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../../utils/api";
import  Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

/**
 * Functional Home component that displays the homepage with a list of decks
 * @returns {JSX.Element} - the Home component JSX
 */
function Home(){
    const [decks, setDecks] = useState([]);
    const history = useHistory();

    useEffect(() => {
    const abortController = new AbortController();
        const fetchDecks = async() => {
            try {
                const data = await listDecks();
                console.log("Fetched decks:", data);
                setDecks(data);
            } catch(error) {
                console.error("error", error);
            }
        }

        fetchDecks();
        return () => {
            abortController.abort();
        }
    }, []);

    /**
     * Handles the Study button 
     * - When a user clicks on the study button, it navigates to the study page for the selected deck.
     * @param {deckId} deckId - The ID of the deck to study.
    */
    const handleStudyClick = (deckId) => {
         history.push(`/decks/${deckId}/study`);
     }
 
    /**
    * Handles the CreateDeck button
    * - When a user clicks on Create Deck button, it navigates them to the create deck page
    */
    const handleCreateDeckClick = () => {
        history.push("/decks/new");
    }
 
    /**
     * Handles the View Click button
     * - When a user clicks on this button, it navigates them to the View page of the selected deck
     * @param {deckId} deckId  - The ID of the deck to view
     */
    const handleViewClick = (deckId) => {
         history.push(`/decks/${deckId}`);
    }

    /** 
    * Handles the Delete button
    * - When the user clicks the Delete button, a warning message is shown and the user can click OK or Cancel. 
    * @param {deckId} deckId - The ID of the deck to delete
    **/
    const handleDelete = async (deckId) => {
        const abortController = new AbortController();
        const confirmed = window.confirm('Delete this deck? You will not be able to recover it');
        if (confirmed) {
            try {
                await deleteDeck(deckId, abortController.signal);
                setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
                history.go(0);
            } catch(error){
                console.error("Error deleting deck", error);
            }
        }
    };
    
    return (
        <div>
            <div className="home-body" style={{ display: 'flex' , flexDirection: 'column'}}>
            <Button variant="outline-primary" style={{ display: 'flex', alignItems: "center", justifyContent: 'center'}} onClick={handleCreateDeckClick}>Create Deck</Button>
            { decks.map((deck) => (
                <div key={deck.id}>
                     <div
                        className="modal show"
                        style={{ display: 'block', position: 'initial' }}
                        >
                        <Modal.Dialog>
                            <Modal.Header>
                                <Modal.Title>{deck.name}</Modal.Title>
                                <Modal.Title>{deck.cards.length} cards</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>{deck.description}</p>
                            </Modal.Body>

                            <Modal.Footer>
                            <Link to={`/decks/${deck.id}`}>
                                <Button variant="primary" onClick={() => handleViewClick(deck.id)}>View</Button>
                             </Link>
                             <Link to={`/decks/${deck.id}/study`}>
                                <Button variant="warning" onClick={() => handleStudyClick(deck.id)}>Study</Button>
                             </Link>
                            <Button variant="danger" onClick={() => handleDelete(deck.id)}> Delete </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                        </div>
                </div>
            ))}
        </div>
        </div>
    )
}


export default Home;
