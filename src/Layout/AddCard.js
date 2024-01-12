//path - /decks/:deckId/cards/new

import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
/**
 * 
 * @returns "cards": [
    {
      "front": "What does <Switch> do?",
      "back": "Renders the first matching child <Route> ",
      "deckId": 2,
      "id": 5
    }
  ]
 */

function AddCard() {
    const initialFormState = {
        front: '',
        back: '',
        deckId: '',
        id: '',
    }
    const [ formData, setFormData ] = useState(initialFormState);
    const [ card, setCard ] = useState({});
    const [ deck, setDeck ] = useState({
        name: '',
        front: '',
        back: '',
        cards: [],
    })
    const { deckId } = useParams();
    const history = useHistory();

   useEffect(() => {
    const abortController = new AbortController();
    const fetchDeck = async() => {
        try {
            const loadedDeck = await readDeck(deckId, abortController.signal);
            setDeck(loadedDeck);
        }
        catch(error){
            console.log('Error fetching deck', error);
        }
        abortController.abort();
    }
        fetchDeck();
    }, [deckId]);

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log('form data', formData);
        try{
            const newCard = await createCard(deckId, formData);
            setCard(newCard);
            setFormData(initialFormState);
            history.push("/");
        }
        catch(error){
            console.log('Error submitting form: ', error);
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }))
    }

    const handleDoneButton = (event) => {
        event.preventDefault();
        history.push('/${deck.name}');
    }

    const navBar = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{ deck.name }</Link>
                </li>
                <li className="breadcrumb-item">
                    Add Card
                </li>
            </ol>
        </nav>
    )

    return (
        <div className="createCardPage">
            {navBar}
            <title>Add Card</title>
            <div className="createCardForm">
                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <label>
                            <p>Front</p>
                            <textarea name="front" value={formData.front} onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <p>Back</p>
                            <textarea name="back" value={formData.back}  onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={() => handleDoneButton()}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCard;