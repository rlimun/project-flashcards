import React, { useState , useEffect } from "react";
import { readDeck } from "../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";
import CardsList from "./CardsList";
import { deleteDeck } from "../utils/api";


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
               // setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId));
                history.go(0);
            } catch(error){
                console.error("Error deleting deck", error);
            }
        }
    };

    const navBar = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    {deck.name}
                </li>
            </ol>
        </nav>
    )

    return (
        <div>
            <div>
                {navBar}
                <h3>{deck.name}</h3>
                <p>{deck.description}</p>
                <button onClick={() => handleEditButton()}>Edit</button>
                <button onClick={() => handleStudyButton()}>Study</button>
                <button onClick={() => handleAddCardsButton()}>Add Cards</button> 
                <button onClick={() => handleDeleteButton()}>Delete</button>
            </div>
            <div>
                <CardsList deck={deck} setDeck={setDeck}/>
            </div>
        </div>
    )
}

export default Deck;

//01/10/2023 - this page goies to a 404, when i click on the edit deck button, it goes to 404