import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-container">
      <h1 className="privacy-title">Privacy Policy</h1>
      <div className="privacy-content">
        <section className="privacy-section">
          <h2>Information We Collect</h2>
          <p>We collect information that you provide directly to us when using our train journey services, including:</p>
          <ul>
            <li>Personal identification information</li>
            <li>Contact information</li>
            <li>Travel preferences and history</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Process your bookings and transactions</li>
            <li>Provide customer support</li>
            <li>Send important updates about your journey</li>
            <li>Improve our services</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information and maintain its confidentiality.</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
