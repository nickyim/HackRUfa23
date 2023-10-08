import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { db } from "../firebase-config";
import { ref, onValue } from "firebase/database";

const YourSubmissions = ({ currentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const userSubmissionsRef = ref(
        db,
        "users/" + currentUser.uid + "/submissions"
      );
      onValue(userSubmissionsRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setSubmissions(Object.values(data));
        } else {
          setSubmissions([]);
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      {submissions.map((submission, index) => (
        <div
          key={index}
          className="submission-box"
          onClick={() => {
            setSelectedSubmission(submission.submission);
            setShowModal(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <p>{submission.submission}</p>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Your Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && <p>{selectedSubmission}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default YourSubmissions;
