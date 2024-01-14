//path - /decks/:deckId/cards/new

import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


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
            console.log('new card', newCard);
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

/**
 * NEED TO FIX: WHY DOES CLICKING ON ADD CARDS ON STUDY PAGE TAKE ME TO EDIT CARD PAGE INSTEAD OF ADD CARD
 */
