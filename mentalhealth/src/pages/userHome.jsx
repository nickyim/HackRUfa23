import React, { useState, useEffect } from "react";
import "./UserHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { getDatabase, ref, set } from "firebase/database";
import YourSubmissions from '../components/YourSubmissions';  // Ensure the import path is correct based on your folder structure

function UserHome({ userName: propUserName }) {
  const [submission, setSubmission] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (user) {
        setDisplayName(user.displayName || propUserName);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, [propUserName]);

  const handleSubmissionChange = (event) => {
    setSubmission(event.target.value);
  };

  const handleSubmission = () => {
    if (currentUser) {
      const db = getDatabase();
      set(ref(db, "users/" + currentUser.uid), {
        username: displayName,
        email: currentUser.email,
        submission: submission,
      });
    }
  };

  return (
    <body id="myBody">
      <Container fluid>
        <div className="user-home-container">
          <Container>
            <h1 className="welcome-header" style={{ textAlign: "center" }}>
              Welcome {displayName}! Nice to see you!
            </h1>
            <div className="text-center">
              <a href="#submissions">
                <button className="submissions-button">To Submissions</button>
              </a>
            </div>

            <div className="mission-statement">
              <h2 className="mission-header" style={{ textAlign: "center" }}>
                Our Mission
              </h2>
              <p className="funies-text">
              {" "}
                The mission of our hackathon project is to bridge the gap in
                mental health support by creating an accessible and affordable
                alternative to traditional therapy. We recognize that many
                individuals, for various reasons, face barriers when seeking
                professional therapy services. Whether it be due to financial
                constraints or a lack of access to mental health resources,
                countless people are left without the support they desperately
                need. Our vision is to provide a platform where individuals can
                share their thoughts, emotions, and struggles by recording short
                messages. These messages serve as a medium for them to express
                their feelings, difficulties, and challenges. Our innovative
                approach connects these individuals with volunteer therapists
                who are willing to dedicate their time and expertise to offer
                compassionate and empathetic responses. The heart of our project
                lies in the belief that everyone deserves access to support, and
                even a brief 5-10 minute response can make a significant
                difference in someone's life. By leveraging the power of
                technology and the kindness of volunteer therapists, we aim to
                bring hope and assistance to those who have been silently
                battling their mental health challenges without access to
                therapy. Our mission is fueled by the understanding that mental
                well-being is a fundamental human right, and it should never be
                contingent on one's financial status or geographic location.
                Through this endeavor, we aspire to create a community of
                empathy, support, and healing. We envision a world where anyone,
                regardless of their circumstances, can find solace, guidance,
                and a path towards better mental health through our platform.
                Our project is a testament to the power of technology and human
                compassion, working hand in hand to make mental health support
                accessible to all. Together, we aim to provide hope, strength,
                and a brighter future for individuals on their journey to
                improved mental well-being.
              </p>
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

              <YourSubmissions currentUser={currentUser} />
            </div>
          </Container>
        </div>
      </Container>
    </body>
  );
}

export default UserHome;
