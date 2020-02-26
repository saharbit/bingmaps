import React from "react";
import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { Marker } from "../types";

interface Props {
    onSubmit: (marker: Marker) => void;
}

const CoordinatesInput: React.FC<Props> = ({ onSubmit }) => {
    return (
        <Formik
            onSubmit={({ latitude, longitude }) =>
                onSubmit({ location: [Number(latitude), Number(longitude)] })
            }
            initialValues={{
                latitude: "",
                longitude: ""
            }}
        >
            {({ handleSubmit, handleChange }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="latitude">
                        <Form.Control
                            placeholder="latitude"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="longitude">
                        <Form.Control
                            placeholder="longitude"
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button type="submit">Add</Button>
                </Form>
            )}
        </Formik>
    );
};

export default CoordinatesInput;
