//path - /decks/:deckId/edit
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck(){
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState([]);
    const history = useHistory();
    const [ formData, setFormData ] = useState({
        name: '',
        description: '',
    })
    const initialFormState = {  
        name: '',
        description: '',
    };

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
            {navBar}
            <div className="editDeckForm">
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
                            <textarea name="description" value={formData.description} onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={() => handleCancelButton()}>Cancel</button>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDeck;