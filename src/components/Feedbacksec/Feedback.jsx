// Feedback.js
import React, { useState } from 'react';
import './Feedback.css';

const Feedback = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: '',
    type: 'general'
  });
  
  const [feedbackList, setFeedbackList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback submission here
    setFeedbackList(prev => [feedback, ...prev].slice(0, 3)); // Keep only the latest 3 feedbacks
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    // Reset form
    setFeedback({
      name: '',
      email: '',
      message: '',
      type: 'general'
    });
    
    // Hide tick mark after a short duration
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="feedback-container">
      <h1>Feedback</h1>
      <div className="feedback-content">
        <form onSubmit={handleSubmit}>
          {/* Form Fields */}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Feedback Type</label>
            <select
              id="type"
              name="type"
              value={feedback.type}
              onChange={handleChange}
            >
              <option value="general">General</option>
              <option value="bug">Bug Report</option>
              <option value="feature">Feature Request</option>
              <option value="complaint">Complaint</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Feedback</label>
            <textarea
              id="message"
              name="message"
              value={feedback.message}
              onChange={handleChange}
              required
              rows="5"
            ></textarea>
          </div>

          <button type="submit" className="submit-button">
            Submit Feedback
          </button>
          {submitted && <div className="success-message">✔ Feedback Submitted!</div>}
        </form>
      </div>
    </div>
  );
};

export default  Feedback;