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
    setLostForm({ ...lostForm, [e.target.name]: e.target.value });
  };

  const handleFoundInputChange = (e) => {
    setFoundForm({ ...foundForm, [e.target.name]: e.target.value });
  };

  const reportFoundItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/lost-and-found/report-found",
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
      alert(error.response?.data?.message || "Failed to report the item. Please try again.");
    }
  };

  const searchLostItems = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/lost-and-found/search-lost",
        lostForm
      );
      setLostItems(response.data.lostItems);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch lost items. Please try again.");
    }
  };

  const markAsFounded = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/lost-and-found/mark-as-founded/${id}`
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
        "http://localhost:5000/api/lost-and-found/founded-items"
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
                  <li key={item._id}>
                    <p>
                      <strong>Train:</strong> {item.trainNumber} | <strong>Date:</strong>{" "}
                      {item.date} | <strong>Description:</strong> {item.itemDescription}
                    </p>
                    <button onClick={() => markAsFounded(item._id)}>Mark as Founded</button>
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
