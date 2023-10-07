import React, { useState } from 'react';
import './UserRegistration.css';
import Alert from 'react-bootstrap/Alert';

function UserRegistration({ onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [struggle, setStruggle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleRegisterClick = () => {
    // Your registration logic here...

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
          <label>What are you struggling with?</label>
          <textarea
              value={struggle}
              onChange={(e) => setStruggle(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Bio</label>
          <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
          />
      </div>
      <div className="input-group">
          <label>Profile Picture</label>
          <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
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

export default UserRegistration;
