import React from "react";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <header>
        <h1>Welcome to Our Website</h1>
      </header>

      <section className="mission-statement">
        <h2>Our Mission Statement</h2>
        <p>Some text about your mission...</p>
      </section>

      <section className="submission-section">
        <h2>Your Submission:</h2>

        <div className="boxes">
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
