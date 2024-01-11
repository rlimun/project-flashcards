import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";



const CreateDeck = () => {
    const initialFormState = {
        name: '',
        description: '',
    }
    const [ formData, setFormData ] = useState(initialFormState);
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

    const handleSubmitForm = async (event, {target}) => {
        event.preventDefault();
        // const newName = event.target.elements.name.value;
        // const newDescription = event.target.elements.description.value;

        setFormData((currentFormData) => ({
            ...currentFormData,
            [target.name]: target.value,
        }))

        const response = await createDeck({formData});

        setFormData(initialFormState);
        history.push(`/decks/${response.id}`);
    }

    const handleCancelButton = (event) => {
        event.preventDefault();
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
                            <input name="name" value={formData.name}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <p>Description</p>
                            <textarea name="description" value={formData.name}/>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={handleCancelButton}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateDeck;