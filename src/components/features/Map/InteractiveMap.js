import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './InteractiveMap.css';
import PropTypes from 'prop-types';

const geoUrl = "/maps/world.json";  

const InteractiveMap = ({ selectedCountryCode, selectedCountries, topCountries }) => {
  const [countries, setCountries] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([20, 0]);

  useEffect(() => {
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        setCountries(data.features);
      });
  }, []);

  useEffect(() => {
    if (selectedCountryCode && countries) {
      const selectedCountry = countries.find(country => country.properties.ISO_A2 === selectedCountryCode);
      if (selectedCountry) {
        const [lng, lat] = selectedCountry.geometry.coordinates[0][0];
        setCenter([lat, lng]);
        setZoom(5);
      }
    }
  }, [selectedCountryCode, countries]);

  const getColor = (countryCode) => {
    if (selectedCountries.includes(countryCode)) {
      return '#FF5722'; 
    }

    const topCountryIndex = topCountries.findIndex(country => country.cca3 === countryCode);
    if (topCountryIndex === 0) {
      return 'gold'; 
    } else if (topCountryIndex > 0) {
      const opacity = 1 - (topCountryIndex / topCountries.length);
      return `rgba(255, 215, 0, ${opacity})`; 
    }

    return '#3388ff'; 
  };

  const onEachCountry = (country, layer) => {
    const { ISO_A2 } = country.properties;
    const fillColor = getColor(ISO_A2);

    layer.setStyle({
      fillColor,
      fillOpacity: 0.7,
      color: '#FFF',
      weight: 1,
    });

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        e.target.setStyle({
          fillOpacity: 0.7,
        });
      },
      click: () => {
        console.log(`Selected Country: ${ISO_A2}`);
      },
    });
  };

  const createIcon = (url) => {
    return new L.Icon({
      iconUrl: url,
      iconSize: [25, 15], 
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
      className: 'custom-icon'
    });
  };

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <MapUpdater />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {countries && (
        <GeoJSON data={countries} onEachFeature={onEachCountry} />
      )}
      {selectedCountryCode
        ? countries &&
          countries
            .filter(country => country.properties.ISO_A2 === selectedCountryCode)
            .map(country => (
              <Marker
                key={country.properties.ISO_A2}
                position={L.GeoJSON.coordsToLatLng(country.geometry.coordinates[0][0])}
                icon={createIcon(country.properties.flag)}
              >
                <Popup>
                  {country.properties.name}
                </Popup>
              </Marker>
            ))
        : topCountries.map((country, index) => (
            <Marker
              key={country.cca3}
              position={[country.latlng[0], country.latlng[1]]}
              icon={createIcon(country.flags.png)}
            >
              <Popup>
                {country.name.common}
              </Popup>
            </Marker>
          ))}
    </MapContainer>
  );
};

InteractiveMap.propTypes = {
  selectedCountryCode: PropTypes.string,
  selectedCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
  topCountries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default InteractiveMap;