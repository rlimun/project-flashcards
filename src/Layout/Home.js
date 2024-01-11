import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";


const Home = () => {
    console.log("Home component is rendering");
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

    const handleStudyClick = (deckId) => {
         history.push(`/decks/${deckId}/study`);
     }
 
     const handleCreateDeckClick = (deckId) => {
         history.push("/decks/new");
     }
 
     const handleViewClick = (deckId) => {
         history.push(`/decks/${deckId}`);
     }

    /** 
    * Delete Deck prompt
    * When the user clicks the Delete button, a warning message is shown and the user can click OK or Cancel. 
    * If the user clicks OK, the deck is deleted and the deleted deck is no longer visible on the Home screen.
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
            <button onClick={handleCreateDeckClick}>Create Deck</button>
            { decks.map((deck) => (
                <div key={deck.id}
                >
                    <h4>{deck.name} {deck.cards.length} cards</h4>
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deck.id}`}>
                        <button onClick={() => handleViewClick(deck.id)}>
                            View
                        </button>
                    </Link>
                    <Link to={`/decks/${deck.id}/study`}>
                        <button onClick={() => handleStudyClick(deck.id)}> 
                            Study
                        </button>
                    </Link>
                    <button name="delete" onClick={() => handleDelete(deck.id)}> Delete </button>
                </div>
            ))}
        </div>
    )

}


export default Home;

/*
By wrapping it in an arrow function, you're ensuring that the handleDeleteButton function is only invoked when the button is 
*/
              