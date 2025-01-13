import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import "./scenicview.css";
import SlidingCardSlider from "./SlidingCardSlider";
import Train from "../../assets/train-4781.gif";
import Chatbot from "../Chatbot/Chatbot";

// Custom Icon for markers (unchanged)
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
  const [alarmOn, setAlarmOn] = useState(false); // State to manage alarm
  const [ringEffect, setRingEffect] = useState(false); // State for ring effect

  // Fetching marker data from API
  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("http://localhost:5000/api/marked-points");
      const data = await response.json();
      setMarkers(data);
    };

    fetchMarkers();
  }, []);

  // Calculate distance between user's location and markers
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

  // Function to calculate distance between two latitudes and longitudes
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

    return R * c; // Distance in meters
  };

  // Share user location (Geolocation)
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

  // Toggle the alarm on and off
  const toggleAlarm = () => {
    setAlarmOn((prevState) => !prevState);
  };

  // Play alarm sound and start ring effect
  useEffect(() => {
    if (alarmOn && notifications.length > 0) {
      const alarmSound = new Audio(
        "https://www.soundjay.com/button/beep-07.wav"
      );
      alarmSound.play();

      setRingEffect(true);
      setTimeout(() => {
        setRingEffect(false); 
      }, 10000);
    }
  }, [notifications, alarmOn]);

  return (
    
    
    <div className="scenic-view">
      <div className="scenic-view-container">
        <div className="head-scenic">
          <div>
            <h1>
              Scenic <span style={{ color: "green" }}>View</span>
            </h1>
          </div>
          <div className="alarm">
            <span>
              {/* Alarm icon */}

              <i
                className={`fa-${alarmOn ? "solid" : "regular"} fa-bell`}
                onClick={toggleAlarm}
                style={{
                  color: "red",
                  cursor: "pointer",
                  marginLeft: "15px",
                  fontSize: "24px",
                }}
              ></i>
            </span>
          </div>
        </div>

        <button onClick={shareLocation}><i class="fa-solid fa-location-dot"> </i> Share Location</button>
<div><SlidingCardSlider /></div>
        <div className="notification-box">
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((note, index) => {
              const marker = markers.find(
                (m) => `Nearby Place: ${m.title}` === note
              );
              const imageUrl = `../../../public/assets/${marker?.title}.jpg`;

              return (
                <div
                  key={index}
                  className={`notification-item ${ringEffect ? "ring" : ""}`} // Add ring effect class
                >
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
           {/* Moving GIF */}
      <div className="moving-gif-container">
        <img
          src={Train}
          alt="Moving GIF"
          className="moving-gif"
        />
      </div>
      
      </div>

      <Chatbot />
     
    </div>

  );
};

export default ScenicView;
