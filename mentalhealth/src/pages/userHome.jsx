import React, { useState } from "react";
import "./UserHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

function UserHome({ userName }) {
  const [submission, setSubmission] = useState("");

  const handleSubmissionChange = (event) => {
    setSubmission(event.target.value);
  };

  const handleSubmission = () => {
    //this is where data will be sent to firebase
    console.log(submission);
  };

  return (
    <div className="user-home-container">
      <Container>
        <h1 className="welcome-header" style={{ textAlign: "center" }}>
          Welcome {userName}! Nice to see you!
        </h1>
        <div className="text-center">
          <button className="submissions-button">
            <a href="#submissions">To Submissions</a>
          </button>
        </div>

        <div className="mission-statement">
          <h2 className="mission-header" style={{ textAlign: "center" }}>
            "[write mission statement here]"
          </h2>
          <p className="funies-text"> "funies"</p>
        </div>

        <div id="submissions" className="submissions-section">
          <h3>Your Submissions:</h3>
          <textarea
            value={submission}
            onChange={handleSubmissionChange}
            className="submission-textarea"
          ></textarea>
          <button onClick={handleSubmission} className="submit-button">
            Submit
          </button>
        </div>
      </Container>
    </div>
  );
}

export default UserHome;
