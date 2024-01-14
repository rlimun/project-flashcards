//path - /decks/:deckId/cards/new

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

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
            history.push("/");
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
            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formFront">
                <Form.Label>Front</Form.Label>
                <Form.Control 
                    as="textarea"
                    name="front"
                    placeholder={formData.front}
                    value={formData.front}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
            
                <Form.Group className="mb-3" controlId="formBack">
                <Form.Label>Back</Form.Label>
                <Form.Control 
                    as="textarea"
                    name="back"
                    placeholder={formData.back}
                    value={formData.back}
                    onChange={handleInputChange}
                    required
                />
                </Form.Group>
                <Button variant="outline-secondary" onClick={() => handleDoneButton()}>Done</Button> 
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
      </div>
    )
}

export default AddCard;