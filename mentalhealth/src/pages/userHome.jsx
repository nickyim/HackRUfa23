import React, { useState, useEffect } from "react";
import "./UserHome.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal } from "react-bootstrap";
import { auth, db } from "../firebase-config";
import { getDatabase, ref, push, onValue, child } from "firebase/database";
import YourSubmissions from "../components/YourSubmissions";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref as storageRef,
} from "firebase/storage";
import { ref as sRef } from "firebase/storage";
import { useNavigate } from "react-router-dom";

function UserHome({ userName: propUserName }) {
  const [submission, setSubmission] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileURL, setFileURL] = useState("");
  const [selectedFileURL, setSelectedFileURL] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (currentUser && selectedFile) {
      const storage = getStorage();
      const fileRef = sRef(
        storage,
        "files/" + currentUser.uid + "/" + selectedFile.name
      );

      await uploadBytes(fileRef, selectedFile);
      const fileURL = await getDownloadURL(fileRef);

      const dbRef = getDatabase();
      const submissionRef = ref(
        dbRef,
        "users/" + currentUser.uid + "/fileSubmissions"
      );
      push(submissionRef, {
        username: displayName,
        email: currentUser.email,
        fileURL: fileURL,
      }).then(() => {
        console.log("File URL saved to firebase database");
        setUploadStatus("Upload successful!");
      });
    }
  };

  const handleCloseModal = () => {
    setSelectedFile(null);
    setShowModal(false);
  };

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
      const submissionRef = ref(
        getDatabase(),
        `users/${currentUser.uid}/submissions`
      );
      push(submissionRef, {
        username: displayName,
        email: currentUser.email,
        submission: submission,
      });
    } else {
      console.log("User is not logged in.");
    }
  };

  const handleNewMessage = (submissionId) => {
    if (currentMessage) {
      const newMessageRef = ref(
        getDatabase(),
        `users/${currentUser.uid}/submissions/${submissionId}/chat`
      );
      push(newMessageRef, {
        sender: "user",
        timestamp: Date.now(),
        message: currentMessage,
      }).then(() => {
        setCurrentMessage("");
      });
    }
  };

  return (
    <Container fluid>
      <div className="user-home-container">
        {/* Profile Icon Button */}
        <button
          className="profile-icon-button"
          onClick={() => navigate("/profile")}
        >
          🚹 Profile{" "}
          {/* This is a dummy icon, replace with your desired icon */}
        </button>
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
            Disclaimer: Urgent Mental Health Support: Thank you for using our
            platform to connect with volunteer therapists and seek support for
            your mental well-being. We are committed to providing a safe and
            empathetic space for individuals to share their thoughts and
            feelings. However, it is crucial to understand that our platform is
            not a substitute for professional mental health services, and there
            are certain precautions you should be aware of: In Case of Urgent
            Mental Health Emergency: If you are in crisis or experiencing a
            mental health emergency that poses an immediate risk to yourself or
            others, please do not use this platform as your primary source of
            help. Instead, contact your local emergency services or a mental
            health crisis hotline immediately. Your safety and well-being are
            our top priorities. Not a Replacement for Professional Therapy: Our
            platform provides a supportive environment, but the responses you
            receive from volunteer therapists are not a substitute for
            professional therapy or medical advice. If you have ongoing mental
            health concerns, consider seeking assistance from a licensed mental
            health professional. Confidentiality and Privacy: While we take
            utmost care to maintain user privacy and confidentiality, please
            remember that the internet is not entirely secure. Be mindful of the
            information you share on this platform, and avoid disclosing
            personal or sensitive details that you are uncomfortable sharing
            online. Respect and Civility: We expect all users to treat one
            another with respect and kindness. Any form of harassment, hate
            speech, or inappropriate behavior will not be tolerated and may
            result in the removal of your access to the platform. User
            Responsibility: It's important to recognize that the platform relies
            on the goodwill of volunteer therapists who provide their time and
            expertise voluntarily. Be patient and understanding in your
            interactions, and keep in mind that response times may vary.
            Feedback: If you have any feedback or concerns regarding the
            platform or the responses you receive, please do not hesitate to
            reach out to us. Your input helps us improve our services. By using
            this platform, you acknowledge and agree to these precautions and
            guidelines. We are here to support you to the best of our ability,
            but your safety and well-being are of paramount importance. Please
            use this platform responsibly and in conjunction with professional
            mental health services when needed. If you are uncertain about any
            aspect of your mental health or have questions about our platform,
            please consult with a mental health professional or a medical
            expert. Thank you for being a part of our community, and we hope
            that the support you find here contributes positively to your mental
            health journey. Sincerely, HeartToHeart
          </div>
          <div className="image-container">
            <img
              src={process.env.PUBLIC_URL + "/noah.jpg"}
              alt="Description of Image"
              className="inserted-image"
            />
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
            <div>
              <input
                type="file"
                onChange={handleFileChange}
                className="file-input"
              />
              <button onClick={handleFileUpload} className="upload-button">
                Upload File
              </button>
              <span>{uploadStatus}</span>
            </div>

            <YourSubmissions
              currentUser={currentUser}
              setSelectedSubmission={setSelectedSubmission}
              setShowModal={setShowModal}
            />
          </div>
        </Container>
      </div>
    </Container>
  );
}

export default UserHome;
