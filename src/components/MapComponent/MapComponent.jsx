import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Map Component
const MapComponent = () => {
  const [markers, setMarkers] = useState([]);
  
  // Fetch existing markers from the database on component mount
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/markers'); // API call to fetch markers
        setMarkers(res.data); // Set markers in state
      } catch (error) {
        console.error('Error fetching markers', error);
      }
    };

    fetchMarkers();
  }, []);

  // Handle adding marker
  const handleAddMarker = async (lat, lng) => {
    try {
      const res = await axios.post('http://localhost:5000/api/markers/add', { lat, lng });
      setMarkers([...markers, res.data.marker]); // Add the new marker to state
    } catch (error) {
      console.error('Error adding marker', error);
    }
  };

  // Handle deleting marker
  const handleDeleteMarker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/markers/remove/${id}`);
      setMarkers(markers.filter(marker => marker._id !== id)); // Remove the marker from state
    } catch (error) {
      console.error('Error removing marker', error);
    }
  };

  // Map Events
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        handleAddMarker(lat, lng); // Add the marker on map click
      }
    });
    return null;
  };

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      
      {markers.map((marker) => (
        <Marker
          key={marker._id}
          position={[marker.lat, marker.lng]}
          icon={new L.Icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}
        >
          <Popup>
            <span>Lat: {marker.lat}, Lng: {marker.lng}</span>
            <br />
            <button onClick={() => handleDeleteMarker(marker._id)}>Delete Marker</button>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
