import React, { useEffect, useState } from "react";
import { Form, FormControl, ListGroup } from "react-bootstrap";
import { Marker } from "../types";
import axios from "axios";
import { BING_MEGA_SECRET_KEY } from "../constants";
import { useDebounce } from "use-debounce";

interface Props {
    onSubmit: (marker: Marker) => void;
}

const AutocompleteInput: React.FC<Props> = ({ onSubmit }) => {
    const [address, setAddress] = useState("");
    const [suggestedAddresses, setSuggestedAddresses] = useState([]);
    const [debouncedAddress] = useDebounce(address, 500);

    useEffect(() => {
        searchForAddresses();
    }, [debouncedAddress]);

    async function searchForAddresses() {
        try {
            const response = await axios.get(
                `http://dev.virtualearth.net/REST/v1/Locations?query=${address}&key=${BING_MEGA_SECRET_KEY}`
            );
            setSuggestedAddresses(response.data.resourceSets[0].resources);
        } catch (e) {
            console.warn(e);
        }
    }

    function resetForm() {
        setSuggestedAddresses([]);
        setAddress("");
    }

    return (
        <>
            <Form.Group controlId="address">
                <Form.Control
                    placeholder="address"
                    onChange={(
                        e: React.FormEvent<FormControl & HTMLInputElement>
                    ) => setAddress(e.currentTarget.value)}
                    value={address}
                />
            </Form.Group>
            <ListGroup>
                {suggestedAddresses.map((address: any, index) => (
                    <ListGroup.Item
                        key={index}
                        action
                        onClick={() => {
                            resetForm();
                            onSubmit({
                                location: address.geocodePoints[0].coordinates
                            });
                        }}
                    >
                        {address.address.formattedAddress}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </>
    );
};

export default AutocompleteInput;
