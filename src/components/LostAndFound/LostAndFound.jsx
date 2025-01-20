import React, { useState } from "react";
import axios from "axios";
import "./Lost.css";

const LostAndFound = () => {
  const [lostForm, setLostForm] = useState({ trainNumber: "", date: "" });
  const [foundForm, setFoundForm] = useState({
    trainNumber: "",
    date: "",
    itemDescription: "",
    contactDetails: "",
  });

  const [lostItems, setLostItems] = useState([]);
  const [foundedItems, setFoundedItems] = useState([]);

  const handleLostInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "trainNumber" && value.length > 5) return;
    setLostForm({ ...lostForm, [name]: value });
  };

  const handleFoundInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "trainNumber" && value.length > 5) return;
    if (name === "contactDetails" && !/^\d{0,10}$/.test(value)) return;
    setFoundForm({ ...foundForm, [name]: value });
  };

  const reportFoundItem = async (e) => {
    e.preventDefault();
    if (foundForm.trainNumber.length !== 5) {
      alert("Train number must be exactly 5 characters.");
      return;
    }
    if (foundForm.contactDetails.length !== 10) {
      alert("Contact number must be exactly 10 digits.");
      return;
    }
    try {
      const response = await axios.post(
        "https://train-journey-backend.onrender.com/api/lost-and-found/report-found",
        foundForm
      );
      alert(response.data.message);
      setFoundForm({
        trainNumber: "",
        date: "",
        itemDescription: "",
        contactDetails: "",
      });
    } catch (error) {
      alert("Failed to report the item. Please try again.");
    }
  };

  const searchLostItems = async (e) => {
    e.preventDefault();
    if (lostForm.trainNumber.length !== 5) {
      alert("Train number must be exactly 5 characters.");
      return;
    }
    try {
      const response = await axios.post(
        "https://train-journey-backend.onrender.com/api/lost-and-found/search-lost",
        lostForm
      );
      if (response.data.lostItems.length === 0) {
        alert("No items found for the specified train number and date.");
      }
      setLostItems(response.data.lostItems);
    } catch (error) {
      alert("Failed to fetch lost items. Please try again.");
    }
  };

  const markAsFounded = async (id) => {
    try {
      const response = await axios.patch(
        `https://train-journey-backend.onrender.com/api/lost-and-found/mark-as-founded/${id}`
      );
      alert(response.data.message);
      setLostItems(lostItems.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark item as founded. Please try again.");
    }
  };

  const fetchFoundedItems = async () => {
    try {
      const response = await axios.get(
        "https://train-journey-backend.onrender.com/api/lost-and-found/founded-items"
      );
      setFoundedItems(response.data.foundedItems);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch founded items.");
    }
  };

  return (
    <div className="landf">
      <div className="lost-and-found-container">
        <h1>Lost and Found</h1>
        <div className="lost-and-found-forms">
          <form className="lost-form" onSubmit={searchLostItems}>
            <h2>Search Lost Items</h2>
            <input
              type="text"
              name="trainNumber"
              placeholder="Train Number"
              value={lostForm.trainNumber}
              onChange={handleLostInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={lostForm.date}
              onChange={handleLostInputChange}
              required
            />
            <button type="submit">Search</button>
          </form>

          <form className="found-form" onSubmit={reportFoundItem}>
            <h2>Report Found Item</h2>
            <input
              type="text"
              name="trainNumber"
              placeholder="Train Number"
              value={foundForm.trainNumber}
              onChange={handleFoundInputChange}
              required
            />
            <input
              type="date"
              name="date"
              value={foundForm.date}
              onChange={handleFoundInputChange}
              required
            />
            <input
              type="text"
              name="itemDescription"
              placeholder="Item Description"
              value={foundForm.itemDescription}
              onChange={handleFoundInputChange}
              required
            />
            <input
              type="text"
              name="contactDetails"
              placeholder="Contact Details"
              value={foundForm.contactDetails}
              onChange={handleFoundInputChange}
              required
            />
            <button type="submit">Report</button>
          </form>
        </div>

        <div className="lost-and-found-lists">
          <div className="lost-items-list">
            <h2>Unfounded Items</h2>
            {lostItems.length > 0 ? (
              <ul>
                {lostItems.map((item) => (
                  <li className="to-be-found" key={item._id}>
                    <p>
                      <strong>Train:</strong> {item.trainNumber} | <strong>Date:</strong>{" "}
                      {item.date} | <strong>Description:</strong> {item.itemDescription} |{" "}
                      <strong>Contact:</strong> {item.contactDetails}
                    </p>
                    <button className="to-be-found-button" onClick={() => markAsFounded(item._id)}>Mark as Founded</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No lost items found.</p>
            )}
          </div>

          <div className="founded-items-list">
            <h2>Founded Items</h2>
            <button
              className="lost-and-found-refresh-button"
              onClick={fetchFoundedItems}
            >
              Refresh Founded Items
            </button>
            {foundedItems.length > 0 ? (
              <ul>
                {foundedItems.map((item) => (
                  <li key={item._id}>
                    <p>
                      <strong>Train:</strong> {item.trainNumber} | <strong>Date:</strong>{" "}
                      {item.date} | <strong>Description:</strong> {item.itemDescription} |{" "}
                      <strong>Contact:</strong> {item.contactDetails}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No founded items found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostAndFound;
