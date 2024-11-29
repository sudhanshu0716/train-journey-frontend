import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import "./AuthPage.css";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Sign-Up Successful");
        localStorage.setItem("token", data.token); 
        navigate("/login"); 
      } else {
        alert(data.message || "Sign-Up Failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred during sign-up.");
    }
  };

  return (
    <div className="form-wrapper">
      <motion.div
        className="login-form-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="login-title bg">Sign Up</h2>
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
      </motion.div>
    </div>
  );
};

export default SignUpPage;
