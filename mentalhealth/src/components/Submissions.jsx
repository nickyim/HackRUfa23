import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { db } from '../firebase-config';  // adjust the path
import { ref, onValue } from "firebase/database";

const Submissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const submissionsRef = ref(db, 'submissions/');
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data ? Object.keys(data).map(key => data[key]) : []; // Convert object to array and handle null data
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
          <p>{submission.type}</p>
          {/* Add more content here, like a thumbnail or preview */}
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && selectedSubmission.type === 'video' && 
            <video src={selectedSubmission.content} controls />}
          {selectedSubmission && selectedSubmission.type === 'voice' && 
            <audio src={selectedSubmission.content} controls />}
          {selectedSubmission && selectedSubmission.type === 'text' && 
            <p>{selectedSubmission.content}</p>}

          {/* Check for profResponse */}
          {selectedSubmission && selectedSubmission.profResponse && <div>
            <h5>Professional Response:</h5>
            <video src={selectedSubmission.profResponse} controls />
          </div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Submissions;
