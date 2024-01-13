//path - /decks/:deckId/edit
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


function EditDeck(){
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState([]);
    const history = useHistory();
    const initialFormState = {  
        name: '',
        description: '',
    };
    const [ formData, setFormData ] = useState(initialFormState);
    

    useEffect(() => {
        const abortController = new AbortController();
        const fetchDeck = async() => {
            try {
                const deck = await readDeck(deckId, abortController.signal);
                console.log('data', deck);
                setFormData({
                    name: deck.name,
                    description: deck.description,
                })
            } catch(error){
                console.log('Error fetching cards ', error);
            }
        }
        fetchDeck();
        return () => {
            abortController.abort();
        }
    }, [deckId]);

    const breadCrumb = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Edit Deck</Breadcrumb.Item>
        </Breadcrumb>
    )

    const handleSubmitForm = async (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        
        const updatedDeck = {
            id: deckId,
            name: formData.name,
            description: formData.description,
        }
        await updateDeck(updatedDeck, abortController.signal);

        const updatedDeckData = await readDeck(deckId, abortController.signal);
        setDeck(updatedDeckData);
        setFormData(initialFormState);
        history.push(`/decks/${deckId}`);
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => (
            {
                ...currentFormData,
                [name]: value,
            }
        ))
    }

    const handleCancelButton = () => {
       // event.preventDefault();
        history.push(`/decks/${deckId}`);
    }


    return (
        <div className="editDeckPage">
            {breadCrumb}
            <div className="editDeckForm">
                <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="formFront">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        as="input"
                        name="name"
                        placeholder={formData.name}
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBack">
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        name="description"
                        placeholder={formData.description}
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>
                <Button variant="outline-secondary" onClick={() => handleCancelButton()}>Cancel</Button> 
                <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </div>
        </div>
    )
}

export default EditDeck;
