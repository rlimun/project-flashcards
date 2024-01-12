import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";



const CreateDeck = () => {
    const initialFormState = {
        name: '',
        description: '',
    }
    const [ formData, setFormData ] = useState(initialFormState);
    const [ deck, setDeck ] = useState({});
    const history = useHistory();

    const navBar = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    Create Deck
                </li>
            </ol>
        </nav>
    )

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

    return (
        <div className="createDeckPage">
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
    )
}

export default CreateDeck;