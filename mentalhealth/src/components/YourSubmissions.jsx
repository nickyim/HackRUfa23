import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal"; // Import the Modal component
import Button from "react-bootstrap/Button";
import { db } from "../firebase-config";
import { ref, onValue, push, remove } from "firebase/database";

const YourSubmissions = ({ currentUser }) => {
  const [submissions, setSubmissions] = useState([]);
  const [showModal, setShowModal] = useState(false); // Added this state
  const [selectedSubmission, setSelectedSubmission] = useState(null); // Added this state
  const [userMessage, setUserMessage] = useState("");
  const [currentResponse, setCurrentResponse] = useState("");

  useEffect(() => {
    if (currentUser) {
      const submissionsRef = ref(db, `users/${currentUser.uid}/submissions`);
      onValue(submissionsRef, (snapshot) => {
        const data = snapshot.val();
        const allSubmissions = [];
        for (let submissionId in data) {
          const submission = {
            ...data[submissionId],
            id: submissionId,
          };
          allSubmissions.push(submission);
        }
        setSubmissions(allSubmissions);
      });
    }
  }, [currentUser]);

  const handleResponseChange = (event) => {
    setCurrentResponse(event.target.value);
  };

  const handleReply = (submissionId) => {
    if (currentResponse && currentUser) {
      const newMessageRef = ref(
        db,
        `users/${currentUser.uid}/submissions/${submissionId}/chat`
      );
      const newMessage = {
        sender: "user",
        timestamp: Date.now(),
        message: currentResponse,
      };
      push(newMessageRef, newMessage).then(() => {
        // Update the local state with the new message
        if (selectedSubmission) {
          setSelectedSubmission((prevSubmission) => ({
            ...prevSubmission,
            chat: [...getChatAsArray(prevSubmission.chat), newMessage],
          }));
        }

        setCurrentResponse(""); // Resetting the response
      });
    }
  };

  const getChatAsArray = (chatData) => {
    if (!chatData) return [];
    if (Array.isArray(chatData)) return chatData;
    return Object.values(chatData);
  };

  return (
    <div>
      {submissions.map((submission) => (
        <div key={submission.id}>
          <h4>
            {submission.submission.substring(0, 30) +
              (submission.submission.length > 30 ? "..." : "")}
          </h4>
          <div
            onClick={() => {
              setSelectedSubmission(submission);
              setShowModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            View Conversation
          </div>
        </div>
      ))}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && (
            <>
              <h4>{selectedSubmission.submission}</h4>
              {getChatAsArray(selectedSubmission.chat)
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((chatMessage, chatIndex) => (
                  <div key={chatIndex} className={chatMessage.sender}>
                    <p>{chatMessage.message}</p>
                    <small>
                      {chatMessage.sender === "user"
                        ? currentUser.displayName
                        : "Professional"}
                      {" - "}
                      {new Date(chatMessage.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              <div>
                <h5>Reply:</h5>
                <textarea
                  value={currentResponse}
                  onChange={handleResponseChange}
                  placeholder="Write your response here..."
                />
                <Button onClick={() => handleReply(selectedSubmission.id)}>
                  Submit Response
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default YourSubmissions;
