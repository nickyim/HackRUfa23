import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { db } from "../firebase-config";
import { ref, onValue, push } from "firebase/database";

const Submissions = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [currentResponse, setCurrentResponse] = useState("");
  const [fileSubmissions, setFileSubmissions] = useState([]); // Add state for file submissions

  useEffect(() => {
    const submissionsRef = ref(db, "users/");
    onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val();
      const allSubmissions = [];
      const allFileSubmissions = []; // Create an array to hold file submissions

      for (let userId in data) {
        const user = data[userId];
        for (let submissionId in user.submissions) {
          const submission = user.submissions[submissionId];
          allSubmissions.push({
            ...submission,
            id: submissionId,
            userId: userId,
            username: user.username,
          });
        }

        // Fetch file submissions
        for (let fileId in user.fileSubmissions) {
          const file = user.fileSubmissions[fileId];
          allFileSubmissions.push({
            ...file,
            id: fileId,
            userId: userId,
            username: user.username,
          });
        }
      }

      setSubmissions(allSubmissions);
      setFileSubmissions(allFileSubmissions); // Set state for file submissions
    });
  }, []);

  const handleResponseChange = (event) => {
    setCurrentResponse(event.target.value);
  };

  const handleSubmitResponse = (submission) => {
    if (currentResponse) {
      const newMessageRef = ref(
        db,
        `users/${submission.userId}/submissions/${submission.id}/chat`
      );
      const newMessage = {
        sender: "professional",
        timestamp: Date.now(),
        message: currentResponse,
      };
      push(newMessageRef, newMessage).then(() => {
        // Update local state to display the new message immediately
        setSelectedSubmission((prevSelectedSubmission) => ({
          ...prevSelectedSubmission,
          chat: [...getChatAsArray(prevSelectedSubmission.chat), newMessage],
        }));
        setCurrentResponse("");
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
      {submissions.map((submission, index) => (
        <div
          key={index}
          className="submission-box"
          onClick={() => {
            setSelectedSubmission(submission);
            setShowModal(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <h4>
            {submission.username} -
            {submission.submission && typeof submission.submission === "string"
              ? submission.submission.substring(0, 30) +
                (submission.submission.length > 30 ? "..." : "")
              : ""}
          </h4>
        </div>
      ))}
      {/* Render File Submissions */}
      {fileSubmissions.map((file, index) => (
        <div
          key={index}
          className="submission-box"
          onClick={() => {
            setSelectedSubmission(file); // Set selected submission to the file
            setShowModal(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <h4>
            {file.username} -
            {file.fileURL ? "File Submission" : "No file provided."}
          </h4>
        </div>
      ))}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && (
            <>
              <h4>{selectedSubmission.username}</h4>
              <p>
                {selectedSubmission.submission || "No submission provided."}
              </p>
              {getChatAsArray(selectedSubmission.chat)
                .sort((a, b) => a.timestamp - b.timestamp)
                .map((chatMessage, chatIndex) => (
                  <div key={chatIndex} className={chatMessage.sender}>
                    <p>{chatMessage.message}</p>
                    <small>
                      {chatMessage.sender === "user"
                        ? selectedSubmission.username
                        : "Professional"}
                      {" - "}
                      {new Date(chatMessage.timestamp).toLocaleString()}
                    </small>
                  </div>
                ))}
              <div>
                <h5>Respond as a Professional:</h5>
                <textarea
                  value={currentResponse}
                  onChange={handleResponseChange}
                  placeholder="Write your response here..."
                />
                <Button
                  onClick={() => handleSubmitResponse(selectedSubmission)}
                >
                  Submit Response
                </Button>
              </div>
            </>
          )}
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

export default Submissions;
