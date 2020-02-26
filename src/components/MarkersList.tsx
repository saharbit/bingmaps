import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Marker } from "../types";

interface Props {
    onRemove: (index: number) => void;
    markers: Marker[];
}

const MarkersList: React.FC<Props> = ({ onRemove, markers }) => {
    return (
        <div className="mt-5">
            <h1>Current Markers</h1>
            <ListGroup>
                {markers.map((marker, index) => (
                    <ListGroup.Item
                        key={index}
                        className="d-flex justify-content-between"
                    >
                        {marker.location.map(
                            (coordinate: number, index: number) => {
                                let isLastCoordinate =
                                    index === marker.location.length - 1;

                                return `${coordinate}${
                                    isLastCoordinate ? "" : ", "
                                }`;
                            }
                        )}
                        <Button
                            variant="danger"
                            onClick={() => onRemove(index)}
                        >
                            X
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default MarkersList;
