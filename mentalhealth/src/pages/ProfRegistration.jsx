import React, { useState } from 'react';
import './UserRegistration.css';
import Alert from 'react-bootstrap/Alert';

function ProfRegistration({ onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [struggle, setStruggle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleRegisterClick = () => {
    // Here, you'd usually send the data to the server, validate it, etc.
    // For the sake of this example, we'll assume registration is always successful.

    // Assuming the registration is successful:
    setShowAlert(true);
    setTimeout(() => {
        onRegisterSuccess();
        setShowAlert(false);
    }, 1000);
};

  return (
    <div className="registration-container">
      <h1>Create account</h1>

      <div className="input-group">
          <label>First Name<span className="required-asterisk">*</span></label>
          <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Last Name<span className="required-asterisk">*</span></label>
          <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Pronouns</label>
          <input
              type="text"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Age<span className="required-asterisk">*</span></label>
          <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>What are your areas of expertise?<span className="required-asterisk">*</span></label>
          <textarea
              value={struggle}
              onChange={(e) => setStruggle(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Bio<span className="required-asterisk">*</span></label>
          <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Profile Picture<span className="required-asterisk">*</span></label>
          <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
      <div className="input-group">
          <label>Credentials For Verification<span className="required-asterisk">*</span></label>
          <input
              type="file"
          />
      </div>
      {showAlert && (
                <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Registration successful! Redirecting to login...
                </Alert>
            )}
      <div className="submit-button">
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default ProfRegistration;
