// eslint-disable-next-line no-unused-vars
import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            We are dedicated to revolutionizing train travel by providing a seamless,
            user-friendly platform for journey planning and ticket booking. Our goal
            is to make train travel more accessible, convenient, and enjoyable for everyone.
          </p>
        </section>

        <section className="features">
          <h2>What We Offer</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Easy Booking</h3>
              <p>Simple and intuitive ticket booking process</p>
            </div>
            <div className="feature-item">
              <h3>Real-time Updates</h3>
              <p>Live train tracking and journey updates</p>
            </div>
            <div className="feature-item">
              <h3>Smart Planning</h3>
              <p>Intelligent route suggestions and planning tools</p>
            </div>
            <div className="feature-item">
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer assistance</p>
            </div>
          </div>
        </section>

        <section className="team">
          <h2>Our Commitment</h2>
          <p>
            We are committed to providing the best possible service to our users.
            Our team works tirelessly to ensure that your train journey experience
            is comfortable, reliable, and hassle-free. We value your feedback and
            continuously strive to improve our services.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;