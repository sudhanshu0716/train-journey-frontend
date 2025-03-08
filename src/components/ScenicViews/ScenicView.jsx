import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import styles from "./scenicview.module.css"; // Fixed CSS Module Import
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
      const response = await fetch(
        "https://train-journey-backend.onrender.com/api/marked-points"
      );
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
    <div className={styles.scenicView}>
      <div className={styles.scenicViewContainer}>
        {/* Header Section */}
        <div className={styles.headScenic}>
          <div>
            <h1>
              Scenic <span style={{ color: "green" }}>View</span>
            </h1>
          </div>
          {/* Alarm Icon */}
          <div className={styles.alarm}>
            <span>
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

        {/* Share Location Button */}
        <button onClick={shareLocation}>
          <i className="fa-solid fa-location-dot"></i> Share Location
        </button>

        {/* Sliding Card Component */}
        <div>
          <SlidingCardSlider />
        </div>

        {/* Notification Box */}
        <div className={styles.notificationBox}>
          <h3>Notifications</h3>
          {notifications.length > 0 ? (
            notifications.map((note, index) => {
              const marker = markers.find(
                (m) => `Nearby Place: ${m.title}` === note
              );
              const imageUrl = `/assets/${marker?.title}.jpg`; // Fixed Image Path

              return (
                <div
                  key={index}
                  className={`${styles.notificationItem} ${
                    ringEffect ? styles.ring : ""
                  }`} // Add ring effect class
                >
                  <h5>{note}</h5>
                  <div className={styles.imageBox}>
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
        <div className={styles.movingGifContainer}>
          <img src={Train} alt="Moving GIF" className={styles.movingGif} />
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  );
};

export default ScenicView;
