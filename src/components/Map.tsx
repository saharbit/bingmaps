// @ts-ignore
import { ReactBingmaps } from "react-bingmaps";
import React, { useEffect, useState } from "react";
import { BING_MEGA_SECRET_KEY } from "../constants";
import { Marker, Polyline } from "../types";

const headquarters = [32.07031, 34.78788];

interface Props {
    markers: Marker[];
}

const Map: React.FC<Props> = ({ markers }) => {
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

    return (
        <ReactBingmaps
            center={
                markers.length > 0
                    ? markers[markers.length - 1].location
                    : headquarters
            }
            className="map"
            bingmapKey={BING_MEGA_SECRET_KEY}
            pushPins={markers}
            polyline={polyline}
        />
    );
};

export default Map;
