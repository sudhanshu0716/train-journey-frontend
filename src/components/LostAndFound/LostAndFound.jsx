"use client"

import { useState } from "react"
import axios from "axios"
import "./Lost.css"

// Define the component as a named function
function LostAndFound() {
  const [lostForm, setLostForm] = useState({ trainNumber: "", date: "" })
  const [foundForm, setFoundForm] = useState({
    trainNumber: "",
    date: "",
    itemDescription: "",
    contactDetails: "",
  })

  const [lostItems, setLostItems] = useState([])
  const [foundedItems, setFoundedItems] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLostInputChange = (e) => {
    const { name, value } = e.target
    if (name === "trainNumber" && value.length > 5) return
    setLostForm({ ...lostForm, [name]: value })
  }

  const handleFoundInputChange = (e) => {
    const { name, value } = e.target
    if (name === "trainNumber" && value.length > 5) return
    if (name === "contactDetails" && !/^\d{0,10}$/.test(value)) return
    setFoundForm({ ...foundForm, [name]: value })
  }

  const reportFoundItem = async (e) => {
    e.preventDefault()
    if (foundForm.trainNumber.length !== 5) {
      alert("Train number must be exactly 5 characters.")
      return
    }
    if (foundForm.contactDetails.length !== 10) {
      alert("Contact number must be exactly 10 digits.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://train-journey-backend.onrender.com/api/lost-and-found/report-found",
        foundForm,
      )
      alert(response.data.message)
      setFoundForm({
        trainNumber: "",
        date: "",
        itemDescription: "",
        contactDetails: "",
      })
    } catch (error) {
      alert("Failed to report the item. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const searchLostItems = async (e) => {
    e.preventDefault()
    if (lostForm.trainNumber.length !== 5) {
      alert("Train number must be exactly 5 characters.")
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        "https://train-journey-backend.onrender.com/api/lost-and-found/search-lost",
        lostForm,
      )
      if (response.data.lostItems.length === 0) {
        alert("No items found for the specified train number and date.")
      }
      setLostItems(response.data.lostItems)
    } catch (error) {
      alert("Failed to fetch lost items. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const markAsFounded = async (id) => {
    setIsLoading(true)
    try {
      const response = await axios.patch(
        `https://train-journey-backend.onrender.com/api/lost-and-found/mark-as-founded/${id}`,
      )
      alert(response.data.message)
      setLostItems(lostItems.filter((item) => item._id !== id))
      // Refresh founded items after marking
      fetchFoundedItems()
    } catch (error) {
      alert(error.response?.data?.message || "Failed to mark item as founded. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchFoundedItems = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get("https://train-journey-backend.onrender.com/api/lost-and-found/founded-items")
      setFoundedItems(response.data.foundedItems)
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch founded items.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="landf">
      <div className="lostAndFoundContainer">
        <h1>
          <i className="fas fa-search-location"></i> Lost and Found
        </h1>

        <div className="content-wrapper">
          {/* Left Column - Forms */}
          <div className="forms-column">
            <form className="form-card lost-form" onSubmit={searchLostItems}>
              <div className="card-header">
                <i className="fas fa-search"></i>
                <h2>Search Lost Items</h2>
              </div>

              <div className="form-group">
                <label htmlFor="lostTrainNumber">
                  <i className="fas fa-train"></i> Train Number
                </label>
                <div className="input-wrapper">
                  <input
                    id="lostTrainNumber"
                    type="text"
                    name="trainNumber"
                    placeholder="Enter 5-digit train number"
                    value={lostForm.trainNumber}
                    onChange={handleLostInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lostDate">
                  <i className="fas fa-calendar-alt"></i> Date
                </label>
                <div className="input-wrapper">
                  <input
                    id="lostDate"
                    type="date"
                    name="date"
                    value={lostForm.date}
                    onChange={handleLostInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search"></i> Search
                  </>
                )}
              </button>
            </form>

            <form className="form-card found-form" onSubmit={reportFoundItem}>
              <div className="card-header">
                <i className="fas fa-hand-holding"></i>
                <h2>Report Found Item</h2>
              </div>

              <div className="form-group">
                <label htmlFor="foundTrainNumber">
                  <i className="fas fa-train"></i> Train Number
                </label>
                <div className="input-wrapper">
                  <input
                    id="foundTrainNumber"
                    type="text"
                    name="trainNumber"
                    placeholder="Enter 5-digit train number"
                    value={foundForm.trainNumber}
                    onChange={handleFoundInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="foundDate">
                  <i className="fas fa-calendar-alt"></i> Date
                </label>
                <div className="input-wrapper">
                  <input
                    id="foundDate"
                    type="date"
                    name="date"
                    value={foundForm.date}
                    onChange={handleFoundInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="itemDescription">
                  <i className="fas fa-info-circle"></i> Item Description
                </label>
                <div className="input-wrapper">
                  <input
                    id="itemDescription"
                    type="text"
                    name="itemDescription"
                    placeholder="Describe the item you found"
                    value={foundForm.itemDescription}
                    onChange={handleFoundInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contactDetails">
                  <i className="fas fa-phone-alt"></i> Contact Number
                </label>
                <div className="input-wrapper">
                  <input
                    id="contactDetails"
                    type="text"
                    name="contactDetails"
                    placeholder="Enter 10-digit contact number"
                    value={foundForm.contactDetails}
                    onChange={handleFoundInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="primary-button" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-plus-circle"></i> Report Item
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Lists */}
          <div className="lists-column">
            <div className="list-card unfounded-items">
              <div className="card-header">
                <i className="fas fa-box-open"></i>
                <h2>Unfounded Items</h2>
              </div>
              <div className="scrollable-list">
                {lostItems.length > 0 ? (
                  <ul>
                    {lostItems.map((item) => (
                      <li key={item._id}>
                        <div className="item-details">
                          <div className="item-info">
                            <p>
                              <i className="fas fa-train"></i>
                              <span>Train:</span> {item.trainNumber}
                            </p>
                            <p>
                              <i className="fas fa-calendar-day"></i>
                              <span>Date:</span> {new Date(item.date).toLocaleDateString()}
                            </p>
                            <p>
                              <i className="fas fa-info-circle"></i>
                              <span>Description:</span> {item.itemDescription}
                            </p>
                            <p>
                              <i className="fas fa-phone"></i>
                              <span>Contact:</span> {item.contactDetails}
                            </p>
                          </div>
                          <button
                            className="action-button"
                            onClick={() => markAsFounded(item._id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <>
                                <i className="fas fa-spinner fa-spin"></i> Processing...
                              </>
                            ) : (
                              <>
                                <i className="fas fa-check-circle"></i> Mark as Found
                              </>
                            )}
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-search"></i>
                    <p>No unfounded items to display</p>
                    <p className="hint">Search for lost items using the form on the left</p>
                  </div>
                )}
              </div>
            </div>

            <div className="list-card founded-items">
              <div className="card-header">
                <i className="fas fa-clipboard-check"></i>
                <h2>Founded Items</h2>
                <button className="refresh-button" onClick={fetchFoundedItems} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Refreshing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-sync-alt"></i> Refresh
                    </>
                  )}
                </button>
              </div>
              <div className="scrollable-list">
                {foundedItems.length > 0 ? (
                  <ul>
                    {foundedItems.map((item) => (
                      <li key={item._id} className="found-item">
                        <div className="item-details">
                          <div className="item-info">
                            <p>
                              <i className="fas fa-train"></i>
                              <span>Train:</span> {item.trainNumber}
                            </p>
                            <p>
                              <i className="fas fa-calendar-day"></i>
                              <span>Date:</span> {new Date(item.date).toLocaleDateString()}
                            </p>
                            <p>
                              <i className="fas fa-info-circle"></i>
                              <span>Description:</span> {item.itemDescription}
                            </p>
                            <p>
                              <i className="fas fa-phone"></i>
                              <span>Contact:</span> {item.contactDetails}
                            </p>
                          </div>
                          <div className="status-badge">
                            <i className="fas fa-check-circle"></i> Found
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="empty-state">
                    <i className="fas fa-box-open"></i>
                    <p>No founded items to display</p>
                    <p className="hint">Click refresh to load founded items</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Make sure to export the component as default
export default LostAndFound

