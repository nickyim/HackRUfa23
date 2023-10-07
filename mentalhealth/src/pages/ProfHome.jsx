// ProfHome.jsx
import React from "react";
import "./ProfHome.css";
import Submissions from "../components/Submissions";  // Make sure the path is correct based on your directory structure

const ProfHome = () => {
  
  /* These are TEST subnmissions. Will replace with fetching from database. */
// Sample Submissions for the ProfHome Page

  const submissions = [
    {
      id: 1,
      type: "video",
      content: "path_to_video1.mp4",
      response: "path_to_response_video1.mp4" // added a video response
    },
    {
      id: 2,
      type: "voice",
      content: "path_to_voice1.mp3",
      response: null
    },
    {
      id: 3,
      type: "voice",
      content: "path_to_voice2.mp3",
      response: "path_to_response_video2.mp4" // added a video response
    },
    {
      id: 4,
      type: "text",
      content: "This is a sample text submission.",
      response: null
    },
    {
      id: 5,
      type: "text",
      content: "Another sample text submission.",
      response: null
    }
  ];

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
        <Submissions submissions={submissions} />
      </section>
    </div>
  );
};

export default ProfHome;
