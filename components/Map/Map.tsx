import React from "react";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

const icon = L.icon({
  iconUrl: "/images/marker-icon.png",
  iconSize: [25, 40],
  iconAnchor: [17, 46],
});

import classes from "./Map.module.scss";

interface Props {
  lat: number;
  lng: number;
}

const Map: React.FC<Props> = ({ lat, lng }) => {
  return (
    <MapContainer className={classes.map} center={[lat, lng]} zoom={15}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={icon} position={[lat, lng]} />
    </MapContainer>
  );
};

export default Map;
