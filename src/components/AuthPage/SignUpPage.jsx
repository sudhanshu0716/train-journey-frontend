import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import {ThreeDots } from 'react-loader-spinner';  // Import the loader component
import Signup from "../../assets/signup.jpg";


const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    try {
      const response = await fetch("https://train-journey-backend.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-Up Successful");
        // localStorage.setItem("token", data.token); // Consider using a more secure storage solution like a dedicated state management library
        navigate("/login"); 
      } else {
        console.log(data);
        alert(data.message || "Sign-Up Failed");
      }
      setIsLoading(false); 
    } catch (error) {
      console.error(error);
      alert("An error occurred during sign-up.");
      setIsLoading(false); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        {/* Add an image here using a background image or an img tag */}
        <img src={Signup} alt="Welcome to RailVista" /> 
      </div>
      <div className="login-form-container">
        <motion.div 
          className="login-form" 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {isLoading ? ( 
            <ThreeDots type="ThreeDots" color="#00BFFF" height={80} width={80} /> 
          ) : ( 
            <> 
              <h2 className="login-title">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-entry">
                  <input
                    className="login-input"
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-entry">
                  <input
                    className="login-input"
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button className="login-button" type="submit">
                  Sign Up
                </button>
                <p>
                  Already have an account? <Link to="/login">Login</Link>
                </p>
              </form>
            </> 
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;