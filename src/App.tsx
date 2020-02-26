import React, { useState } from "react";
import AddMarkerForm from "./components/AddMarkerForm";
import MarkersList from "./components/MarkersList";
import Map from "./components/Map";
import { Col, Container, Row } from "react-bootstrap";
import { Marker } from "./types";

function App() {
    const [markers, setMarkers] = useState<Marker[]>([]);

    function addMarker(marker: Marker) {
        setMarkers([...markers, marker]);
    }

    function removeMarker(index: number) {
        let updatedMarkers = [...markers];
        updatedMarkers.splice(index, 1);
        setMarkers(updatedMarkers);
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <AddMarkerForm onSubmit={addMarker} />
                    <MarkersList markers={markers} onRemove={removeMarker} />
                </Col>
                <Col>
                    <Map markers={markers} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
