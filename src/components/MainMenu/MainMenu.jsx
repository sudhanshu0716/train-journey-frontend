import React from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";
import wheel from "../../assets/wheel.png"; // Import the PNG
import gate from "../../assets/gate.png";
import buffer from "../../assets/buffer.png";

// Grid images
import image1 from "../../assets/1.jpg";
import image2 from "../../assets/2.jpg";
import image3 from "../../assets/3.jpg";
import image4 from "../../assets/4.jpg";
import image5 from "../../assets/5.jpg";
import image6 from "../../assets/6.jpg";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";


const images = [image1, image2, image3, image4, image5, image6];

const MainMenu = () => {
  return (
    <div className="main-menu-wrapper">
      <div className="navbar">
      <div className="buffer">
        <img src={buffer} alt="" />
      </div>
      <nav className="horizontal-nav">
        <div className="gate">
        <img src={gate} alt="" />
        </div>
        <ul>
          <li className="nav-item">
            <Link to="/scenic">
              Scenic Views
              <span className="underline"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/crush">
              Crush the Rush
              <span className="underline"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lost">
              Lost and Found
              <span className="underline"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/instant-help">
              Instant Help
              <span className="underline"></span>
            </Link>
          </li>
          
          <li className="nav-item">
            <Link to="/community-section">
              Community 
              <span className="underline"></span>
            </Link>
          </li>
        </ul>
        <div className="gate1">
          <img src={gate} alt="" />
        </div>
        <div className="nav-text-container">
          <div className="nav-text">INDIAN RAILWAYS</div>
          <div className="nav-text">INDIAN RAILWAYS</div>
          <div className="nav-text">INDIAN RAILWAYS</div>
        </div>
        <div className="nav-text-red-container">
          <div className="nav-text-red">A1</div>
          <div className="nav-text-red">NEW DELHI ⇋ BHOPAL</div>
          <div className="nav-text-red">12138</div>
          <div className="nav-text-red">A1</div>
        </div>
        <div className="wheels-container">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={wheel} alt="Train Wheel" className="train-wheels" />
          ))}
        </div>
      </nav>
      </div>

      <br />
      <br />
      <br />
      <h1 className="heading-grid">
        Most Beautiful Train Journeys In India You Must Experience
      </h1>

      <div className="image-grid-container">
        {images.map((image, index) => (
          <div key={index} className="grid-item">
            <img src={image} alt={`Grid Image ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="mmfoot">
        <h1 className="mmfoot-head">CONTACT US</h1>
        <div className="mmfoot-list">
          <a
            href="https://www.instagram.com/travel._.trains?igsh=dXd5eDgyajB0MG82"
            className="mmfoot-list-item"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.linkedin.com/in/sudh0716/"
            className="mmfoot-list-item"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:example@example.com" className="mmfoot-list-item">
            <BiLogoGmail />
          </a>
          <a
            href="https://github.com/sudhanshu0716"
            className="mmfoot-list-item"
          >
            <FaGithub />
          </a>
        </div>
        <div>
        <div className="mmfoot-links">
          <Link to="/about" className="mmfoot-link">About Us</Link>
          <Link to="/privacy-policy" className="mmfoot-link">Privacy Policy</Link>
          <Link to="/feedback" className="mmfoot-link">Feedback</Link>
        </div>
        <h4 className="mmcopyr">2024 © SUDHANSHU, All Rights Reserved</h4>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
