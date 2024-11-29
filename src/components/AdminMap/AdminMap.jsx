import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./AdminMap.css";

const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const AdminMap = () => {
  const [markers, setMarkers] = useState([]);
  const [mode, setMode] = useState("add");
  const [markerTitle, setMarkerTitle] = useState("");
  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/marked-points");
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        console.error("Error fetching markers:", error);
      }
    };
    fetchMarkers();
  }, []);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;

    if (mode === "add" && markerTitle.trim()) {
      const newMarker = { title: markerTitle, latitude: lat, longitude: lng };

      try {
        const response = await fetch("http://localhost:5000/api/marked-points/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMarker),
        });

        const data = await response.json();
        if (response.ok) {
          setMarkers([...markers, data]);
          alert("Marker saved!");
        }
      } catch (error) {
        console.error("Error saving marker:", error);
      }
      setMarkerTitle("");
    } else if (mode === "remove") {
      const markerToRemove = markers.find(
        (marker) =>
          Math.abs(marker.latitude - lat) < 0.001 &&
          Math.abs(marker.longitude - lng) < 0.001
      );

      if (markerToRemove) {
        try {
          await fetch(`http://localhost:5000/api/marked-points/delete/${markerToRemove._id}`, {
            method: "DELETE",
          });

          setMarkers(markers.filter((marker) => marker._id !== markerToRemove._id));
          alert("Marker removed!");
        } catch (error) {
          console.error("Error removing marker:", error);
        }
      }
    }
  };

  const AddOrRemoveMarker = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <div className="admin-map-container">
      <input
        type="text"
        placeholder="Enter title"
        value={markerTitle}
        onChange={(e) => setMarkerTitle(e.target.value)}
        disabled={mode === "remove"}
      />
      <button onClick={() => setMode(mode === "add" ? "remove" : "add")}>
        Toggle to {mode === "add" ? "Remove Marker" : "Add Marker"}
      </button>
      <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: "700px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <AddOrRemoveMarker />
        {markers.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon}
          >
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default AdminMap;
