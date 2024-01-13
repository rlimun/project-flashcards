import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

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

    const [ formData, setFormData ] = useState(initialCardState);
    

    useEffect(() => {
        const abortController = new AbortController();
        console.log('deck id', deckId);
        const fetchDeck = async() => {
            try {
                const loadedDeck = await readDeck(deckId, abortController.signal);
                console.log('deck', loadedDeck);
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
                })
                updateCard(fetchedCard);
            } catch(error){
                console.log('Error fetching cards ', error);
            }
        }
        fetchCard();
        return () => {
            abortController.abort();
        }
    }, [cardId]);

    ///decks/:deckId/cards/:cardId/edit
    const navBar = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/${deck.name}/`}>{deck.name} </Link>
                </li>
                <li className="breadcrumb-item"> Edit card</li>
            </ol>
        </nav>
    )

    const handleSubmitForm = async (event) => {
        const abortController = new AbortController();
        event.preventDefault();
     
        console.log('form data', formData);
        await updateCard(formData, abortController.signal);
        
        const updatedCardData = await readCard(cardId, abortController.signal);
      //  setCard(updatedCardData);
        setFormData(initialCardState);
        history.push(`/decks/${deckId}/cards/${cardId}`);
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
        history.push(`/decks/${deckId}`);
    }


    return (
        <div className="editCardPage">
            {navBar}
            <div className="editCardForm">
                <form onSubmit={handleSubmitForm}>
                    <div className="form-group">
                        <label>
                            <p>Front</p>
                            <textarea name="front" value={formData.front} onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <p>Back</p>
                            <textarea name="back" value={formData.back} onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div className="button-group">
                        <button onClick={() => handleCancelButton()}>Done</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCard;