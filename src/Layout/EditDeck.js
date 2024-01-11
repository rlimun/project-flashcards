//path - /decks/:deckId/edit
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({setDeck}){
    const { deckId } = useParams();
    const history = useHistory();
    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
    })

    useEffect(() => {
        console.log('edit deck component rendered');
        const abortController = new AbortController();
        const fetchDeck = async() => {
            try {
                const response = await readDeck(deckId, abortController.signal);
                const data = await response.json();
                setFormData({
                    name: data.name,
                    description: data.description,
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

    const navBar = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    Edit Deck
                </li>
            </ol>
        </nav>
    )

    const handleSubmitForm = async (event, {target}) => {
        event.preventDefault();
        
        const updatedDeck = {
            name: formData.name,
            description: formData.description,
        }

        await updateDeck(deckId, updatedDeck);

        setFormData((currentFormData) => ({
            ...currentFormData,
            [target.name]: target.value,
        }))

        const response = await readDeck(deckId);
        setDeck(response);

        history.push(`/decks/${deckId}`);
    }

    const handleCancelButton = () => {
       // event.preventDefault();
        history.push('/deck');
    }


    return (
        <div className="editDeckPage">
            {navBar}
            <div className="editDeckForm">
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
                        <button onClick={() => handleCancelButton}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDeck;