import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

/**
 * Functional EditCard component that allows editing details of a specific card within a deck
 * @returns {JSX.Element} React component for editing a card within a deck
 */
function EditCard(){
    const { deckId, cardId } = useParams();
    const [ deck, setDeck ] = useState({
        name: '',
        description:'',
    });
    
    const history = useHistory();
    //const [ loading, setLoading ] = useState(true);
    const initialCardState = {  
        front: '',
        back: '',
        deckId: '',
        id: '',
    };
    const [ card, setCard ] = useState(initialCardState);
    const [ formData, setFormData ] = useState(initialCardState);
    

    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async() => {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);

                setDeck(loadedDeck);
            } catch(error){
                console.log('Error fetching cards ', error);
            }
        }
        fetchDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    useEffect((event) => {
        const abortController = new AbortController();
        
        const fetchCard= async() => {
            try {
                const fetchedCard = await readCard(cardId, abortController.signal);
                setFormData({
                    id: fetchedCard.id,
                    front: fetchedCard.front,
                    back: fetchedCard.back,
                    deckId: +deckId,
                })
            } catch(error){
                console.log('Error fetching cards ', error);
            }
        }
        fetchCard();
        return () => {
            abortController.abort();
        }
    }, [cardId]);

    /**
     * Handles the form submission for updating a card
     * @param {event} event - the form submission event
     */
    const handleSubmitForm = async (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        await updateCard(formData, abortController.signal);
        const updatedCardData = await readCard(cardId, abortController.signal);
        setCard(updatedCardData);
        setFormData(initialCardState);
        history.push(`/decks/${deckId}`);
    }

    /**
     * Handles the input changes in the form
     * - This extracts name and value from the changed input fields
     * @param {event} event - the input change event
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => (
            {
                ...currentFormData,
                [name]: value,
            }
        ))
    }

    /**
     * Handles the Cancel button
     * - When a user clicks Cancel, it navigates them back to the specific deck page
     */
    const handleCancelButton = () => {
        history.push(`/decks/${deckId}`);
    }

    const breadCrumb = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href={`/decks/${deck.id}`}>{deck.name}</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Card</Breadcrumb.Item>
        </Breadcrumb>
    )

    return (
        <div className="editCardPage">
            {breadCrumb}
            <div className="editCardForm">
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
                    <Button variant="outline-secondary" onClick={() => handleCancelButton()}>Done</Button>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default EditCard;