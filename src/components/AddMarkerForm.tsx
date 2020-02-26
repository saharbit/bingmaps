import React, { useState } from "react";
import CoordinatesInput from "./CoordinatesInput";
import AutocompleteInput from "./AutocompleteInput";
import { Form } from "react-bootstrap";
import { Marker } from "../types";

interface Props {
    onSubmit: (marker: Marker) => void;
}

enum FORM_TYPES {
    COORDINATES,
    AUTOCOMPLETE
}

const AddMarkerForm: React.FC<Props> = ({ onSubmit }) => {
    const [formType, setFormType] = useState(FORM_TYPES.COORDINATES);

    return (
        <div>
            <h1>Add Marker</h1>
            <Form.Check
                onClick={() => setFormType(FORM_TYPES.COORDINATES)}
                disabled={formType === FORM_TYPES.COORDINATES}
                type="radio"
                label="Add by coordinates"
            />
            <Form.Check
                className="mb-3"
                onClick={() => setFormType(FORM_TYPES.AUTOCOMPLETE)}
                disabled={formType === FORM_TYPES.AUTOCOMPLETE}
                type="radio"
                label="Add by autocomplete"
            />

            {formType === FORM_TYPES.COORDINATES && (
                <CoordinatesInput onSubmit={onSubmit} />
            )}
            {formType === FORM_TYPES.AUTOCOMPLETE && (
                <AutocompleteInput onSubmit={onSubmit} />
            )}
        </div>
    );
};

export default AddMarkerForm;
