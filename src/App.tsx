import React, { useEffect, useState } from "react";
import { Marker } from "./types";
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    Row
} from "react-bootstrap";
import AddMarkerForm from "./components/AddMarkerForm";
import MarkersList from "./components/MarkersList";
import Map from "./components/Map";

type ApexCord = {
    Map_ID__c: string;
    Id: string;
    Longitude__c: number;
    Latitude__c: number;
};

type ApexMap = {
    Id: string;
    Name: string;
    Map_Cords__r: ApexCord[];
};

function App() {
    const [markers, setMarkers] = useState<Marker[]>([]);
    const [mapName, setMapName] = useState("");
    const [mapId, setMapId] = useState<string | null>(null);

    useEffect(() => {
        function tryRestoreMapById() {
            const search = window.location.search;
            const params = new URLSearchParams(search);
            const id = params.get("id");

            if (id) {
                // @ts-ignore
                window.Visualforce.remoting.Manager.invokeAction(
                    // @ts-ignore
                    window.RemoteActions.getMap,
                    id,
                    handleRemoteActionResult
                );
            }
        }

        tryRestoreMapById();
    }, []);

    function handleRemoteActionResult(result: ApexMap, event: any) {
        setMapId(result.Id);
        setMapName(result.Name);
        let markers = result.Map_Cords__r.map((cord: ApexCord) => ({
            location: [cord.Longitude__c, cord.Latitude__c],
            id: cord.Id
        }));
        setMarkers(markers);

        console.log(event);
    }

    function addMarker(marker: Marker) {
        setMarkers([...markers, marker]);

        if (mapId) {
            // @ts-ignore
            window.Visualforce.remoting.Manager.invokeAction(
                // @ts-ignore
                window.RemoteActions.updateMap,
                mapId,
                mapName,
                marker.location,
                null,
                handleRemoteActionResult
            );
        }
    }

    function removeMarker(index: number) {
        let updatedMarkers = [...markers];
        let cordId = updatedMarkers[index].id;
        updatedMarkers.splice(index, 1);
        setMarkers(updatedMarkers);

        if (mapId && cordId) {
            // @ts-ignore
            window.Visualforce.remoting.Manager.invokeAction(
                // @ts-ignore
                window.RemoteActions.updateMap,
                mapId,
                mapName,
                null,
                cordId,
                handleRemoteActionResult
            );
        }
    }

    function onCreateMap(e: React.FormEvent) {
        e.preventDefault();

        // @ts-ignore
        window.Visualforce.remoting.Manager.invokeAction(
            // @ts-ignore
            window.RemoteActions.createMap,
            mapName,
            markers.map(marker => marker.location),
            handleRemoteActionResult
        );
    }

    function onUpdateMap(e: React.FormEvent) {
        e.preventDefault();

        // @ts-ignore
        window.Visualforce.remoting.Manager.invokeAction(
            // @ts-ignore
            window.RemoteActions.updateMap,
            mapId,
            mapName,
            null,
            null,
            handleRemoteActionResult
        );
    }

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>map id: {mapId || "-"}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <AddMarkerForm onSubmit={addMarker} />
                    <MarkersList markers={markers} onRemove={removeMarker} />
                </Col>
                <Col>
                    <Map markers={markers} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form onSubmit={mapId ? onUpdateMap : onCreateMap}>
                        <Form.Group controlId="mapName">
                            <Form.Control
                                placeholder="Map Name"
                                onChange={(
                                    e: React.FormEvent<
                                        FormControl & HTMLInputElement
                                    >
                                ) => setMapName(e.currentTarget.value)}
                                value={mapName}
                            />
                        </Form.Group>
                        <Button type="submit">
                            {mapId ? "Update Map" : "Create Map"}
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
