import React from "react";
import { Link } from "react-router-dom";
import "./AdminMenu.css";

const AdminMenu = () => {
  return (
    <div className="admin-menu-container">
      <h1>Admin Menu</h1>
      <div className="card-container">

        <div className="card">
          <h3>Scenic Views</h3>
          <p>View and manage scenic view locations.</p>
          <Link to="/scenic">
            <button className="card-button">Go to Scenic Views</button>
          </Link>
        </div>

     
        <div className="card">
          <h3>Lost and Found Admin Panel</h3>
          <p>Manage lost and found reports and data.</p>
          <Link to="/adminlost">
            <button className="card-button">Go to Lost and Found Admin</button>
          </Link>
        </div>

        <div className="card">
          <h3>Crush the Rush</h3>
          <p>Manage rush hour locations and data.</p>
          <Link to="/crush">
            <button className="card-button">Go to Crush the Rush</button>
          </Link>
        </div>

    
        <div className="card">
          <h3>Admin Map</h3>
          <p>Manage map markers and locations.</p>
          <Link to="/adminmap">
            <button className="card-button">Go to Admin Map</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
