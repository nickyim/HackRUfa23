import React, { useState } from 'react';
import './UserRegistration.css';

function ProfRegistration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [struggle, setStruggle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  return (
    <div className="registration-container">
      <h1>Sign Up</h1>

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
          <label>Pronouns<span className="required-asterisk">*</span></label>
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
          <label>What are your areas of expertise?</label>
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
          <label>Mandatory profile picture</label>
          <input
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
          />
        </div>
      <div className="input-group">
          <label>Credentials For Verification</label>
          <input
              type="file"
          />
      </div>
      <div className="submit-button">
          <button onClick={() => console.log('Registration submitted')}>Register</button>
      </div>
    </div>
  );
}

export default ProfRegistration;
