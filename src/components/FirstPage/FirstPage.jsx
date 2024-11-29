import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FirstPage.css";
import video from "../../assets/background-video2.mp4"
import Logo from "../../assets/logo.png";

const FirstPage = () => {
  const navigate = useNavigate();
  const [currentTagline, setCurrentTagline] = useState(0);

  // Dynamic taglines for the animation
  const taglines = [
    ["Experience", "The wonder of", "rail journey"],
    ["Crush the rush", "Unreserved", "Uncrowded"],
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000); // Change tagline every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Handlers for navigation
  const handleLogin = () => {
    navigate("/login");
  };

  const handleLoginAdmin = () => {
    navigate("/admin");
  };

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div className="fp-container">
      <video className="fp-background-video" autoPlay loop muted >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="fp-header">
        <img className="fp-logo" src={Logo}></img>
        <div className="fpbutton">
          <button className="fp-login-btn" onClick={handleLogin}>
            Login
          </button>
          <button className="fp-login-btn" onClick={handleLoginAdmin}>
            Admin Login
          </button>
        </div>
      </div>

      <div className="fp-main">
        <div className="fp-tagline">
          {taglines[currentTagline].map((line, index) => (
            <span key={index} className="fp-tagline-line">
              {line}
            </span>
          ))}
        </div>
      </div>
      <button className="fp-get-started-btn" onClick={handleGetStarted}>
        Get Started
      </button>

      <footer className="fp-footer">
        <marquee className="fp-marquee" scrollamount="22">
          "Indian Railways: Empowering the Nation with Speed, Seamless Connectivity, and an Expansive Network." ||
          "Indian Railways: Journey through India's Heart, Where Speed Meets Scenic Beauty on Every Track."
        </marquee>
      </footer>
    </div>
  );
};

export default FirstPage;
