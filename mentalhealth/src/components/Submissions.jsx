import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase-config';
import { ref, onValue } from "firebase/database";

const Submissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const submissionsRef = ref(db, 'users/');
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data ? Object.entries(data).map(([key, value]) => value.submission).filter(Boolean) : [];
      setSubmissions(formattedData);
    });
  }, []);

  return (
    <div>
      {submissions.map((submission, index) => (
        <div 
          key={index} 
          className="submission-box" 
          onClick={() => {
            setSelectedSubmission(submission);
            setShowModal(true);
          }}
          style={{ cursor: 'pointer' }}
        >
          <p>{submission}</p> 
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && <p>{selectedSubmission}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Submissions;
