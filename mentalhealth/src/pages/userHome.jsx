import React, { useState, useEffect } from "react";
import "./UserHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { getDatabase, ref, push, onValue, child } from "firebase/database";
import YourSubmissions from "../components/YourSubmissions"; 

function UserHome({ userName: propUserName }) {
  const [submission, setSubmission] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [currentMessage, setCurrentMessage] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      const submissionRef = ref(db, `users/${currentUser.uid}/submissions`);
      push(submissionRef, {
        username: displayName,
        email: currentUser.email,
        submission: submission
      });
    } else {
      console.log("User is not logged in.");
    }
  };

  const handleNewMessage = (submissionId) => {
    if (currentMessage) {
      const newMessageRef = ref(db, `users/${currentUser.uid}/submissions/${submissionId}/chat`);
      push(newMessageRef, {
        sender: "user",
        timestamp: Date.now(),
        message: currentMessage
      }).then(() => {
        setCurrentMessage('');
      });
    }
  };

  return (
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
              [Your Mission Statement Here...]
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

            <YourSubmissions 
              currentUser={currentUser}
              setSelectedSubmission={setSelectedSubmission}
              setShowModal={setShowModal}
            />
          </div>
          
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Your Submission</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedSubmission && (
                <>
                  <p>{selectedSubmission.submission}</p>
                  {selectedSubmission.chat && selectedSubmission.chat.map((msg, idx) => (
                    <div key={idx}>
                      <strong>{msg.sender}:</strong> {msg.message}
                    </div>
                  ))}
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Write your message..."
                  ></textarea>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleNewMessage(selectedSubmission.id)}>
                Send Message
              </Button>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </Container>
  );
}

export default UserHome;
