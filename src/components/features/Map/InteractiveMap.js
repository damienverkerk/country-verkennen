import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PropTypes from 'prop-types';
import './InteractiveMap.css';

const geoUrl = "/maps/world.json";  

const useMapData = () => {
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    fetch(geoUrl)
      .then(response => response.json())
      .then(data => {
        setCountries(data.features);
      });
  }, []);

  return countries;
};

const InteractiveMap = ({ selectedCountryCode, selectedCountries, topCountries }) => {
  const countries = useMapData();
  const [zoom, setZoom] = useState(2);
  const [center, setCenter] = useState([20, 0]);

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

  const getColor = useCallback((countryCode) => {
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
  }, [selectedCountries, topCountries]);

  const onEachCountry = useCallback((country, layer) => {
    const { ISO_A2, name } = country.properties;
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
        console.log(`Selected Country: ${name}`);
      },
    });

    layer.bindTooltip(name, { permanent: false, direction: 'center' });
  }, [getColor]);

  const createIcon = useCallback((url) => {
    return new L.Icon({
      iconUrl: url,
      iconSize: [25, 15], 
      iconAnchor: [12, 12],
      popupAnchor: [0, -12],
      className: 'custom-icon'
    });
  }, []);

  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
  };

  if (!countries) {
    return <div>Loading...</div>;
  }

  return (
    <div className="interactive-map-container">
     <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} aria-label="Interactive World Map">
     <MapUpdater />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      <GeoJSON data={countries} onEachFeature={onEachCountry} />
      {selectedCountryCode
        ? countries
            .filter(country => country.properties.ISO_A2 === selectedCountryCode)
            .map(country => (
              <Marker
                key={country.properties.ISO_A2}
                position={L.GeoJSON.coordsToLatLng(country.geometry.coordinates[0][0])}
                icon={createIcon(country.properties.flag)}
              >
                <Popup>{country.properties.name}</Popup>
              </Marker>
            ))
        : topCountries.map((country, index) => (
            <Marker
              key={country.cca3}
              position={[country.latlng[0], country.latlng[1]]}
              icon={createIcon(country.flags.png)}
            >
              <Popup>{country.name.common}</Popup>
            </Marker>
          ))}
    </MapContainer>
    </div>
  );
};

InteractiveMap.propTypes = {
  selectedCountryCode: PropTypes.string,
  selectedCountries: PropTypes.arrayOf(PropTypes.string).isRequired,
  topCountries: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default InteractiveMap;
