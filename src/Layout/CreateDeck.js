import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

/**
 * Functional component that creates a new deck
 * @returns {JSX.Element} React component that renders the create deck form with inputs
 */
function CreateDeck() {
    const initialFormState = {
        name: '',
        description: '',
    }
    const [ formData, setFormData ] = useState(initialFormState);
    const [ deck, setDeck ] = useState({});
    const history = useHistory();

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try{
            const newDeck = await createDeck(formData);
            setDeck(newDeck);
            setFormData(initialFormState);
            history.push(`/decks/${newDeck.id}`);
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
     * Handles the cancel button onclick event
     * When the user clicks cancel, they are navigated back to the homepage
     */
    const handleCancelButton = () => {
        history.push('/');
    }

    const breadCrumb = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Create Deck</Breadcrumb.Item>
        </Breadcrumb>
    );


    return (
        <div className="createDeckPage">
            {breadCrumb}
            <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3" controlId="formDeckName">
                <Form.Label>Name</Form.Label>
                <Form.Control input name="name" placeholder={formData.name} value={formData.name} onChange={handleInputChange} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDeckDescription">
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
            <Button variant="outline-secondary" onClick={() => handleCancelButton()}>
                Cancel
            </Button>               
            <Button variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default CreateDeck;