import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../../styles/interactiveMap.css';
const createIcon = (color) => {
  return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
  });
};


const visitedIcon = createIcon('green');
const wishListIcon = createIcon('violet');

const InteractiveMap = ({ selectedCountries, wishListCountries }) => {
  const initialPosition = [20, 0]; 

  return (
      <MapContainer center={initialPosition} zoom={2} style={{ height: '500px', width: '100%' }}>
          <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedCountries.map(country => (
    <Marker
        key={country.cca3}
        position={[country.lat, country.lng]} 
        icon={visitedIcon}
    >
        <Popup>{country.name.common} (Bezocht)</Popup>
    </Marker>
))}
{wishListCountries.map(country => (
    <Marker
        key={country.cca3}
        position={[country.lat, country.lng]} 
        icon={wishListIcon}
    >
        <Popup>{country.name.common} (Wenslijst)</Popup>
    </Marker>
))}
      </MapContainer>
  );
};

export default InteractiveMap;