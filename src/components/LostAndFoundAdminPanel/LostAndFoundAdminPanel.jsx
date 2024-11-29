import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LostAndFoundAdminPanel.css';
import moment from 'moment';

const LostAndFoundAdminPanel = () => {
  const [date, setDate] = useState('');
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      alert('Unauthorized access. Please log in as admin.');
      navigate('/admin-login');
    }
  }, [navigate]);

  const fetchReports = async (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format('YYYY-MM-DD');

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/reports',
        { date: formattedDate }
      );
      setReports(response.data.reports);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to fetch reports.');
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/delete/${id}`
      );
      alert(response.data.message);
      setReports(reports.filter((report) => report._id !== id));
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete item.');
    }
  };

  return (
    <div className="lost-admin-container">
      <h1>Lost and Found Admin Panel</h1>

      <form className="admin-date-form" onSubmit={fetchReports}>
        <h2>Search Reports by Date</h2>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Fetch Reports</button>
      </form>

      <div className="admin-reports-list">
        <h2>Reports</h2>
        {reports.length > 0 ? (
          <ul>
            {reports.map((report) => (
              <li key={report._id}>
                <p>
                  <strong>Train Number:</strong> {report.trainNumber} |{' '}
                  <strong>Date:</strong> {report.date} |{' '}
                  <strong>Description:</strong> {report.itemDescription}
                </p>
                <button
                  className="admin-delete-button"
                  onClick={() => deleteItem(report._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </div>
  );
};

export default LostAndFoundAdminPanel;
