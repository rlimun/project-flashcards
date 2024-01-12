import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Breadcrumb from 'react-bootstrap/Breadcrumb';



const CreateDeck = () => {
    const initialFormState = {
        name: '',
        description: '',
    }
    const [ formData, setFormData ] = useState(initialFormState);
    const [ deck, setDeck ] = useState({});
    const history = useHistory();

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        console.log('form data', formData);
        try{
            const newDeck = await createDeck(formData);
            console.log(newDeck);
            setDeck(newDeck);
            setFormData(initialFormState);
            history.push(`/decks/${newDeck.id}`);
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

    const handleCancelButton = () => {
        history.push('/');
    }

    const navBar = (
        <Breadcrumb>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item active>Create Deck</Breadcrumb.Item>
        </Breadcrumb>
    );


    return (
        <div className="createDeckPage">
            {navBar}
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

/**
 *  <div className="createDeckPage">
            {navBar}
            <div className="createDeckForm">
                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <label>
                            <p>Name</p>
                            <input name="name" value={formData.name} onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <p>Description</p>
                            <textarea name="description" value={formData.description}  onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={() => handleCancelButton}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
 */