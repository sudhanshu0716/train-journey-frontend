import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./AuthPage.css";
import Login from "../../assets/login.jpg";
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots loader

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add state for loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true before fetch

    try {
      const response = await fetch("https://train-journey-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/main-menu");
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during login.");
    } finally {
      setIsLoading(false); // Set loading state to false after fetch completes
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        {/* Add an image here using a background image or an img tag */}
        <img src={Login} alt="Welcome to RailVista" />
      </div>
      <div className="login-form-container">
        <motion.div
          className="login-form"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isLoading ? (
            <ThreeDots color="#00BFFF" height={80} width={80} />
          ) : (
            <>
              <h2 className="login-title">Namaste 🙏</h2>
              <form onSubmit={handleLogin}>
                <div className="form-entry">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-entry">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <button className="login-button" type="submit">
                  Login
                </button>
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;