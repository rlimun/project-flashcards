import React from "react";
import { Form, Button } from 'react-bootstrap';

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
