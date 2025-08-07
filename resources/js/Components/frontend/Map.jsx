import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    LayersControl,
} from "react-leaflet";
import MapPopup from "./MapPopup";
import { useEffect, useRef } from "react";

const Recenter = ({ lat, lng, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lng], zoom);
    }, [lat, lng]);
    return null;
};

export default function Map({
    lat,
    lng,
    location,
    onMarkerDragEnd,
    customMarker,
}) {
    const zoom = 16;
    const center = [lat, lng];
    const markerRef = useRef(null);
    const handleDragEnd = () => {
        const marker = markerRef.current;
        if (marker != null) {
            const { lat, lng } = marker.getLatLng();
            if (onMarkerDragEnd) {
                onMarkerDragEnd({ lat, lng });
            }
        }
    };

    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true}>
            <Recenter lat={lat} lng={lng} zoom={zoom} />
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OpenStreetMap">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Satelite">
                    <TileLayer
                        attribution="Tiles &copy; Esti &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGO, and the GIS User Community"
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapsServer/tile/{z}/{y}/{x}"
                    />
                </LayersControl.BaseLayer>
            </LayersControl>
            <Marker
                position={center}
                draggable={!!onMarkerDragEnd}
                eventHandlers={{ dragend: handleDragEnd }}
                ref={markerRef}
            >
                <Popup minWidth={400} maxWidth={400}>
                    {customMarker || <MapPopup location={location} />}
                </Popup>
            </Marker>
        </MapContainer>
    );
}
