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
  const [fileURLs, setFileURLs] = useState([]);
  const [textSubmissions, setTextSubmissions] = useState([]);
  const [fileSubmissions, setFileSubmissions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const textSubmissionsRef = ref(
        db,
        `users/${currentUser.uid}/submissions`
      );
      onValue(textSubmissionsRef, (snapshot) => {
        const data = snapshot.val();
        const allSubmissions = [];
        for (let id in data) {
          allSubmissions.push({ id, ...data[id] });
        }
        setTextSubmissions(allSubmissions);
      });

      const fileSubmissionsRef = ref(
        db,
        `users/${currentUser.uid}/fileSubmissions`
      );
      onValue(fileSubmissionsRef, (snapshot) => {
        const data = snapshot.val();
        const allFiles = [];
        for (let id in data) {
          allFiles.push({ id, ...data[id] });
        }
        setFileSubmissions(allFiles);
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
      {/* Render Text Submissions */}
      {textSubmissions.map((submission) => (
        <div key={submission.id}>
          <h4>
            {submission.submission
              ? submission.submission.substring(0, 30) +
                (submission.submission.length > 30 ? "..." : "")
              : "No Text Content"}
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
          {/* ... other components */}
        </div>
      ))}

      {/* Render File Submissions */}
      {fileSubmissions.map((file) => (
        <div key={file.id}>
          {file.fileURL ? (
            file.fileURL.endsWith(".mp3") ? (
              <audio controls>
                <source src={file.fileURL} type="audio/mp3" />
                Your browser does not support the audio tag.
              </audio>
            ) : file.fileURL.endsWith(".mp4") ? (
              <video width="320" height="240" controls>
                <source src={file.fileURL} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p></p>
            )
          ) : (
            <p>No file URL</p>
          )}
          <div
            onClick={() => {
              setSelectedSubmission(file); // Adjust this part according to your needs
              setShowModal(true);
            }}
            style={{ cursor: "pointer" }}
          >
            View File
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
