import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Submissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const submissions = [
    {
      type: 'video',
      content: '/path-to-video.mp4',
      profResponse: '/path-to-response-video.mp4',
      preview: '/path-to-thumbnail.jpg', // Add a preview field
    },
    {
      type: 'voice',
      content: '/path-to-audio.mp3',
      profResponse: null,
    },
    {
      type: 'text',
      content: 'This is a text submission.',
      profResponse: null,
    },
    {
      type: 'voice',
      content: '/path-to-another-audio.mp3',
      profResponse: '/path-to-another-response-video.mp4',
    },
    {
      type: 'text',
      content: 'This is another text submission.',
      profResponse: null,
    }
  ];

  const getSubmissionPreview = (submission) => {
    switch(submission.type) {
      case 'video':
        return <img src={submission.preview} alt="Video Thumbnail" />;
      case 'voice':
        return <img src="path_to_audio_icon.png" alt="Voice Preview" />;
      case 'text':
        return <p>{submission.content.slice(0, 50)}...</p>;
      default:
        return null;
    }
  };

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
          {getSubmissionPreview(submission)}
          <p>{submission.type}</p>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && selectedSubmission.type === 'video' && <video src={selectedSubmission.content} controls />}
          {selectedSubmission && selectedSubmission.type === 'voice' && <audio src={selectedSubmission.content} controls />}
          {selectedSubmission && selectedSubmission.type === 'text' && <p>{selectedSubmission.content}</p>}

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
