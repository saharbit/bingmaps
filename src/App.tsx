import React, { useEffect, useState } from "react";
import "./App.css";
import AddMarkerForm from "./components/AddMarkerForm";
import MarkersList from "./components/MarkersList";
import Map from "./components/Map";
import { Col, Container, Row } from "react-bootstrap";

import { Marker, Polyline } from "./types";

function App() {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [polyline, setPolyline] = useState<Polyline | null>(null);

    useEffect(() => {
        let updatedPolyline: Polyline = { location: [] };

        markers.forEach((marker, index) => {
            updatedPolyline.location.push(marker.location);

            if (markers.length === index + 1) {
                updatedPolyline.location.push(markers[0].location);
            }
        });

        setPolyline(updatedPolyline);
    }, [markers]);

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
                    <Map markers={markers} polyline={polyline} />
                </Col>
            </Row>
        </Container>
    );
}

export default App;
