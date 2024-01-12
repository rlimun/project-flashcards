import React, { useState, useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, useHistory, Link } from "react-router-dom";

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
        //note: deckId is dependency array and means that the effect (fetchData) function will only run when the value of deckId changes
        //note: if deckId remains the same between renders, the effect will not be re-executed
    }, [deckId]);


    /**
     * Flip card function that sets front of the card to true or false
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
     * Handles the functionality of clicking on the next button
     * It will go to the next card until it hits the last card
     * Once you are at the last card, it will prompt you to restart cards or cancel
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

    const handleAddCards = async() => {
        history.push(`/decks/${deckId}/cards/new`);
    }

    /**
     * Returns JSX of when you don't have enough cards
     */
    const notEnoughCards = (
        <div>
            <p>Not enough cards</p>
            <button onClick={() => handleAddCards()}>Add Cards</button>
        </div>
    )

   

    /**
     * There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied, 
     * and finally the text Study (e.g., Home/Rendering In React/Study).
     **/
    const breadcrumb = (
        <nav>
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deckId}`}>{selectedDeck.name}</Link>
                </li>
                <li className="breadcrumb-item">
                    Study
                </li>
            </ol>
        </nav>
    )
    // if data hasn't completed fetching, show Loading text
    if(loading) {
        return <p>Loading...</p>
    }
    return (
        <div>
            { numCards <= 2 ? (
                <div>
                    {breadcrumb}
                    {notEnoughCards}
                </div>
            ) : (
                <div>  
                    {breadcrumb}
                    <title>{selectedDeck.title}</title>
                    <div>
                        <h4>
                           Card { currentCardIndex + 1} of {selectedDeck.cards.length}
                        </h4>
                        <p>{ isFront? selectedDeck.cards[currentCardIndex].front : selectedDeck.cards[currentCardIndex].back}</p>
                        { isFront && (
                            <button onClick={flipCard}>Flip</button>
                        )}
                        { !isFront && (
                            <button onClick={handleNextButtonClick}>Next</button>
                        )}
                    </div>
                </div>
            )}
        </div>
            );
 }


 export default Study;