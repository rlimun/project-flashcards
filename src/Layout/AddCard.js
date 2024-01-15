//path - /decks/:deckId/cards/new

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import CardForm from "./CardForm";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Button from 'react-bootstrap/Button';

/**
 * Functional component that adds a new card to a deck
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

    /**
     * When a user submits the form, it takes in the from from the user to create a new card.
     * @param {*} event - the form submission event
     */
    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try{
            const newCard = await createCard(deckId, formData);
            setCard(newCard);
            setFormData(initialFormState);
            const loadedDeck = await readDeck(deckId);
            setDeck(loadedDeck);
            history.push(`/decks/${deck.id}`)
        }
        catch(error){
            console.log('Error submitting form: ', error);
        }
    }

    /**
     * Handles the input changes in the form
     * - This extracts the name and value from the changed input fields
     * @param {event} event - the input change event
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }))
    }

    /**
     * Handles the Done button
     * - When a user clicks done, it navigates them back to the specific deck page
     */
    const handleDoneButton = () => {
        history.push(`/decks/${deck.id}`);
    }

    const breadCrumb = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/decks/${deckId}/`}>{deck.name}</Breadcrumb.Item>
            <Breadcrumb.Item active>Add Card</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <div className="addCardPage">
        {breadCrumb}
        <div className="addCardForm">
            <CardForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleSubmitForm={handleSubmitForm}
            />
            <Button variant="outline-secondary" onClick={() => handleDoneButton()}>Done</Button>
            <Button variant="primary" type="submit" onClick={handleSubmitForm}>Save</Button>
            </div>
    </div>  
    )
}

export default AddCard;