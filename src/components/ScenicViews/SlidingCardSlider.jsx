import React, { useEffect } from "react";
import "./SlidingCardSlider.css";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

import img1 from '../../assets/Dudhsagar_Fall.jpg'
import img2 from '../../assets/betaab-valley.jpg'
import img3 from '../../assets/Jammu-Baramulla.jpg'
import img4 from '../../assets/Nilgiri Mountain Tamil nadu.jpeg'
import img5 from '../../assets/taj.jpg'

const SlidingCardSlider = () => {
  useEffect(() => {
    new Swiper(".slider-wrapper", {
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });
  }, []);

  const toggleSlider = () => {
    const slider = document.querySelector(".slider-container");
    slider.classList.toggle("active");
  };

  return (
    <>
      <div className="slider-container">
        <div className="swiper slider-wrapper">
          <div className="card-list swiper-wrapper">
            <div className="card-item swiper-slide">
              <img
              src={img1}
                alt="User"
                className="user-image"
              />
              <h2 className="user-name">Dudhsagar_Fall</h2>
              <p className="user-profession">GOA</p>
            </div>

            <div className="card-item swiper-slide">
              <img
              src={img2}
                alt="User"
                className="user-image"
              />
              <h2 className="user-name">Betaab valley</h2>
              <p className="user-profession">Jammu Kashmir</p>
            </div>

            <div className="card-item swiper-slide">
              <img
              src={img3}
                alt="User"
                className="user-image"
              />
              <h2 className="user-name">Jammu Baramulla</h2>
              <p className="user-profession">Jammu Kashmir</p>
            </div>

            <div className="card-item swiper-slide">
              <img
              src={img4}
                alt="User"
                className="user-image"
              />
              <h2 className="user-name">Nilgiri Mountain</h2>
              <p className="user-profession">Tamil Nadu</p>
            </div>

            <div className="card-item swiper-slide">
              <img
              src={img5}
                alt="User"
                className="user-image"
              />
              <h2 className="user-name">Taj</h2>
              <p className="user-profession">Agra</p>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>

      <div className="arrow-toggle" onClick={toggleSlider}></div>
    </>
  );
};

export default SlidingCardSlider;
