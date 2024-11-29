import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import "./ScenicView.css";

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const ScenicView = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("http://localhost:5000/api/marked-points");
      const data = await response.json();
      setMarkers(data);
    };

    fetchMarkers();
  }, []);

  useEffect(() => {
    if (userLocation) {
      const nearbyMarkers = markers.filter((marker) => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          marker.latitude,
          marker.longitude
        );
        return distance <= 2000; // Within 2 km
      });

      const newNotifications = nearbyMarkers.map(
        (marker) => `Nearby Place: ${marker.title}`
      );
      setNotifications(newNotifications);
    }
  }, [userLocation, markers]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Returns the distance in meters
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      });
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="scenic-view">
      <div className="scenic-view-container">
        <h1>Scenic View</h1>
        <button onClick={shareLocation}>Share Location</button>

        <div className="notification-box">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((note, index) => {
              const marker = markers.find(
                (m) => `Nearby Place: ${m.title}` === note
              );
              const imageUrl = `../../../public/assets/${marker?.title}.jpg`;

              return (
                <div key={index} className="notification-item">
                  <h5>{note}</h5>
                  <div className="image-box">
                    <img src={imageUrl} alt={marker?.title} />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No nearby markers.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScenicView;
