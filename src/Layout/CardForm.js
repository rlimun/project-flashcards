import React from "react";
import { Form } from 'react-bootstrap';

/**
 * CardForm coponent that renders a form for creating or editing a card within a deck
 * @param {Object} formData - the form data containing card details
 * @param {Function} handleInputChange - the function to handle input changes
 * @param {Function} handleSubmitForm - the function ot handle form submission
 * @returns {JSX.Element} React component that displays a form with input fields for the card details
 */
function CardForm({ formData, handleInputChange, handleSubmitForm }) {
    return (
        <Form onSubmit={handleSubmitForm}>
            <Form.Group className="mb-3" controlId="formFront">
                <Form.Label>Front</Form.Label>
                <Form.Control
                    as="textarea"
                    name="front"
                    placeholder={formData.front}
                    value={formData.front}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBack">
                <Form.Label>Back</Form.Label>
                <Form.Control
                    as="textarea"
                    name="back"
                    placeholder={formData.back}
                    value={formData.back}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>
        </Form>
    );
}

export default CardForm;
