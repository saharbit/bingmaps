// @ts-ignore
import { ReactBingmaps } from "react-bingmaps";
import React from "react";
import { BING_MEGA_SECRET_KEY } from "../constants";
import { Marker, Polyline } from "../types";
const headquarters = [32.07031, 34.78788];

interface Props {
    polyline: Polyline | null;
    markers: Marker[];
}

const Map: React.FC<Props> = ({ markers, polyline }) => {
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
