import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Alert from 'react-bootstrap/Alert';

/**
 * Functional Study component that displays the study page for the selected deck
 * @returns {JSX.Element} - The Study component JSX.
 */
 function Study() {
    const { deckId } = useParams();
    const [ selectedDeck, setSelectedDeck ]  = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ isFront, setIsFront ] = useState(true);
    //note: useState initializes a state variable named numCards with an initial value of 0 and setNumCards is a setter function used to update the value of numCards
    const [ numCards, setNumCards ]  = useState(0); 
    const [ currentCardIndex, setCurrentCardIndex ] = useState(0);
    const history = useHistory();

    //First fetch the data and load the deck
    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            try {
                //You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
                const data = await readDeck(deckId, abortController.signal);
                const numCards = data.cards.length; //getting the number of cards and setting it to variable
                setSelectedDeck(data); //set the data to the state
                setNumCards(numCards); //set the number of cards
            } catch(error) {
                console.error("error", error);
            }
            finally {
                setLoading(false); // used to signal that data fetching process has completed
                abortController.abort(); // an abort signal that cancels the request if component is unmounted before request is complete
            };
        }
        fetchData();
    }, [deckId]);


    /**
     * Flip card function that toggles between the front and back fo the card
     **/
    function flipCard(){
        if(isFront){
            setIsFront(false);
        }
        else {
            setIsFront(true);
        }
    }

    /**
     * Handles Next button
     * - It will go to the next card until it hits the last card
     * - Once you are at the last card, it will prompt you to restart cards or cancel
     */
    const handleNextButtonClick = async() => {
        if(currentCardIndex < selectedDeck.cards.length - 1){
            setCurrentCardIndex(currentCardIndex + 1);
            setIsFront(true)
        } else {
            const restartDeckConfirmed = window.confirm("Restart cards? Click 'cancel' to return to the homepage");
            if (restartDeckConfirmed){
                setCurrentCardIndex(0);
                setIsFront(true);
            }
            else {
                history.push("/");
            }
        }
    }

    /**
     * Handles the Add Card button
     * - When a user clicks on the Add Cards button, it will navigate to the Add card page of that specific deck
     */
    const handleAddCards = async() => {
        history.push(`/decks/${deckId}/cards/new`);
    }

    /**
     * Returns JSX of when you don't have enough cards
     */
    const notEnoughCards = (
        <div>
            <Alert variant="secondary">
                Not enough cards. 
            </Alert>
            <Alert variant="secondary">
                You need at least 3 cards to study.
            </Alert>
            <Button variant="success" onClick={() => handleAddCards()}>Add Cards</Button>
        </div>
    )

    const breadCrumb = (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item href={`/decks/${deckId}`}>{selectedDeck.name}</Breadcrumb.Item>
                <Breadcrumb.Item active>Study</Breadcrumb.Item>
            </Breadcrumb>
        </div>  
    )

    // if data hasn't completed fetching, show Loading text
    if(loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            { numCards <= 2 ? (
                <div>
                    {breadCrumb}
                    {notEnoughCards}
                </div>
            ) : (
                <div>  
                    {breadCrumb}
                    <div className="modal show"
                         style={{ display: 'block', position: 'initial' }}>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title>Card {currentCardIndex + 1} of {selectedDeck.cards.length}</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            { isFront? selectedDeck.cards[currentCardIndex].front : selectedDeck.cards[currentCardIndex].back}
                        </Modal.Body>
                        
                        <Modal.Footer>
                        { isFront && (
                        <Button variant="outline-dark" onClick={flipCard}> Flip </Button>)}
                        { !isFront && (
                            <Button variant="primary" onClick={handleNextButtonClick}> Next </Button> )}
                        </Modal.Footer>
                    </Modal.Dialog>
                    </div>
                </div>
            )}
        </div>
            );
 }


 export default Study;