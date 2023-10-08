// ProfHome.jsx
import React from "react";
import "./ProfHome.css";
import Submissions from "../components/Submissions"; // Make sure the path is correct based on your directory structure

const ProfHome = () => {
  /* These are TEST subnmissions. Will replace with fetching from database. */

  return (
    <div className="profhome-container">
      <header>
        <h1>Welcome to Our Website</h1>
      </header>

      <section className="mission-statement">
        <h2>Our Mission Statement</h2>
        <p>Some text about your mission...</p>
      </section>

      <section className="submission-section">
        <h2>Submissions:</h2>
        <Submissions />
      </section>
    </div>
  );
};

export default ProfHome;
