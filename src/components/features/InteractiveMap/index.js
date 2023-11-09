import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const InteractiveMap = ({ selectedCountries }) => {
    const initialPosition = [20, 0]; 

    return (
        <MapContainer center={initialPosition} zoom={2} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
           {selectedCountries.map(country => {
  if (typeof country.lat === 'number' && typeof country.lng === 'number') {
    return (
      <Marker key={country.cca3} position={[country.lat, country.lng]}>
        <Popup>{country.name}</Popup>
      </Marker>
    );
  } else {
    console.warn(`Ongeldige coördinaten voor land: ${country.name}`);
    return null;
  }
})}

        </MapContainer>
    );
};

export default InteractiveMap;
