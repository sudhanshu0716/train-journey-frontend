import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainMenu.css";
import scenicImg from "../../assets/scenic.jpg";
import lostFoundImg from "../../assets/lf.png";
import crushTheRushImg from "../../assets/crush_the_rush.jpg";

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

      <div className="main-menu-container">
        <h1 className="main-menu-title">MAIN MENU</h1>

        <div className="main-menu-cards">
          <div className="main-menu-card">
            <Link to="/scenic">
              <div className="main-card-image">
                <img src={scenicImg} alt="Scenic Views" />
              </div>
              <div className="main-card-title">Scenic Views</div>
            </Link>
          </div>

          <div className="main-menu-card">
            <Link to="/lost">
              <div className="main-card-image">
                <img src={lostFoundImg} alt="Lost and Found" />
              </div>
              <div className="main-card-title">Lost and Found</div>
            </Link>
          </div>

          <div className="main-menu-card">
            <Link to="/crush">
              <div className="main-card-image">
                <img src={crushTheRushImg} alt="Crush the Rush" />
              </div>
              <div className="main-card-title">Crush the Rush</div>
            </Link>
          </div>
        </div>
      </div>
        <hr className="mmhr"/>
        <hr className="mmhr"/>
      <h1 className="heading-grid">Most Beautiful Train Journeys In India You Must Experience</h1>

  
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
          <a href="https://www.instagram.com/travel._.trains?igsh=dXd5eDgyajB0MG82" className="mmfoot-list-item"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/sudh0716/" className="mmfoot-list-item"><FaLinkedin /></a>
          <a href="" className="mmfoot-list-item"><BiLogoGmail /></a>
          <a href="https://github.com/sudhanshu0716" className="mmfoot-list-item"><FaGithub /></a>
        </div>
        <h4 className="mmcopyr">2024 © SUDHANSHU, All Rights Reserved</h4>
      </div>
    </div>
  );
};

export default MainMenu;
