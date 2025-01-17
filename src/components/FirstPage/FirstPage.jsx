import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FirstPage.css";
import video from "../../assets/background-video2.mp4"
import Logo from "../../assets/logo2.png";
import Loco from "../../assets/loco.png";
import LHB from "../../assets/lhb.png";

const FirstPage = () => {
  const navigate = useNavigate();

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
  const Login = () => {
    navigate("/login");
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
          <button className="fp-login-btn" onClick={Login}>
            Login
          </button>
        </div>
      </div>

      <div className="fp-main">
      <div className="tagline">
          <div className="tgid">EXPERIENCE <div>the</div></div>
          <div className="flip">
            <div><div className="fliptxt">beautiful</div></div>
            <div><div className="fliptxt">scenic</div></div>
            <div><div className="fliptxt">Vibrant</div></div>
            <div><div className="fliptxt">memorable</div></div>
            <div><div className="fliptxt">thrilling</div></div>
          </div>
           <div className="tgid">Train Journey</div>
        </div>
      </div>
      <button className="fp-get-started-btn glass-btn" onClick={handleGetStarted}>
        Get Started
      </button>

      <footer className="fp-footer">
        <marquee className="fp-marquee" scrollamount="22">
          <img src={Loco} className="locofoot1"/>
          <img src={LHB} className="lhbst1"/>
          <img src={LHB} className="lhbst2"/>
          "Indian Railways: Empowering the Nation with Speed, Seamless Connectivity, and an Expansive Network." || 
          "Indian Railways: Journey through India's Heart, Where Speed Meets Scenic Beauty on Every Track."
          <img src={LHB} className="lhbend1"/>
          <img src={LHB} className="lhbend2"/>
          <img src={Loco} className="locofoot2"/>
        </marquee>
      </footer>
    </div>
  );
};

export default FirstPage;
