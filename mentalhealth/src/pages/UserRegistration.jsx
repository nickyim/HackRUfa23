import React, { useState } from 'react';
import './UserRegistration.css';
import {db, auth, storage} from '../firebase-config'
import { ref, set, child, push } from "firebase/database";
import { useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function UserRegistration({ onRegisterSuccess }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pronouns, setPronouns] = useState('');
  const [age, setAge] = useState('');
  const [struggle, setStruggle] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [proffesional, setProffesional] = useState(0);
  const [access, setAccess] = useState(0);

  const handleRegisterClick = async () => {
    const uid = auth.currentUser.uid; // Get the current user's UID
    const userEmail = auth.currentUser.email; // Get the current user's email
    console.log(userEmail);
    
    const userRef = ref(db, 'users/' + uid); // Use ref() function to get a reference
    console.log(uid);
    
    if (!profilePicture) {
        await set(userRef, { // Use set() function to save data
            firstName,
            lastName,
            pronouns,
            age,
            struggle,
            bio,
            proffesional:0,
            access:0,
            email: userEmail  // <-- Set the email here
        });
    } else {
        const storageRef = storage.ref(`profile_pictures/${profilePicture.name}`);
        const uploadTask = storageRef.put(profilePicture);
        uploadTask.on(
            'state_changed',
            snapshot => {
                // Handle the upload progress if needed
            },
            error => {
                console.error("Error uploading image:", error);
            },
            async () => {
                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                await set(userRef, { // Use set() function to save data
                    firstName,
                    lastName,
                    pronouns,
                    age,
                    struggle,
                    bio,
                    proffesional:0,
                    access:0,
                    profilePicture: downloadURL,
                    email: userEmail  // <-- Set the email here as well
                });
            }
        );
    }
 
    setShowAlert(true);
    setTimeout(() => {
        onRegisterSuccess();
        setShowAlert(false);
    }, 1000);
 };
 

const EyeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="#757575"/>
    </svg>
);

const EyeOffIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6C9.79 6 8 7.79 8 10C8 10.22 8.02 10.43 8.05 10.65L2.51 4.11C2.11 3.71 1.49 3.71 1.09 4.11C0.69 4.51 0.69 5.14 1.09 5.54L20.49 24.94C20.89 25.34 21.5 25.34 21.9 24.94C22.31 24.54 22.31 23.91 21.9 23.51L16.17 17.78C16.6 18.21 17.29 18.5 18 18.5C20.21 18.5 22 16.71 22 14.5C22 13.12 20.89 11.84 19.24 10.21L15.77 6.74C14.74 7.21 13.61 7.5 12.47 7.81L12 6M9.2 5L7.27 3.08C7.9 3.03 8.54 3 9.2 3C11.63 3 14.19 3.78 16.27 5.54L14.8 7H14.79C13.12 5.21 10.47 4.7 7.96 5.24L9.2 5M12 20C9.65 20 7.5 18.68 6.74 16.85C6.1 16.79 5.45 16.7 4.81 16.5C6.03 18.79 8.79 20 12 20M4.16 4.12C4.12 4.16 4.08 4.2 4.04 4.24L2.44 5.83C2.18 5.94 1.97 6.1 1.78 6.29C0.5 7.9 0 9.9 0 12C0 16.4 4.43 20.5 12 20.5C13.8 20.5 15.5 20.11 17.03 19.39L18.84 21.2C18.93 21.28 19.03 21.36 19.13 21.43C18.96 21.59 18.79 21.73 18.61 21.85C17.1 22.79 15.58 23 14.05 23C13.79 23 13.53 23 13.28 22.97C12.84 22.97 12.42 22.95 12 22.92C8.27 22.5 5.04 20.32 3.26 16.5C3.24 16.47 3.23 16.43 3.21 16.4L1.62 17.99C1.11 18.5 0.26 18.5 0 18.21C-0.27 17.91 0.11 17.37 0.62 16.86L2.22 15.26C1.77 14.74 1.42 14.12 1.16 13.5L3.66 11H3.78C4.59 11.66 5.7 12.1 6.89 12.5L8.39 11H8.4C8.15 10.46 8 9.74 7.89 9H7.81L9.31 7.5C9.69 8.29 10.16 9 10.72 9.59L12.23 8.09C11.76 7.17 11.5 6.09 11.47 5L12.97 3.5C14.5 4.06 15.78 4.82 16.89 5.76L20.03 3.15C19.96 3.09 19.89 3.03 19.83 2.96L18.83 2H18.82C20.95 3.27 23.07 5.64 24 8.96C24.18 9.57 24.33 10.28 24.43 11H24.5L22 13.5C21.8 13.18 21.58 12.86 21.36 12.54L19.85 14.04C19.63 13.83 19.39 13.64 19.15 13.45L17.65 14.95C16.7 14.5 15.58 14.16 14.42 13.96L12.92 15.46C12.58 15.5 12.25 15.5 11.91 15.54L9.16 18.29C9.34 18.69 9.58 19.07 9.87 19.42L11.67 17.62C14.14 18.83 17.3 19.42 20.84 18.92L22.34 20.42C21.24 21.36 19.89 21.97 18.55 22.33C17.21 22.69 15.85 22.82 14.5 22.82C14.32 22.82 14.13 22.81 13.95 22.8L12.46 24.3C12.83 24.43 13.2 24.54 13.58 24.63C13.96 24.72 14.35 24.8 14.74 24.85C14.95 24.89 15.17 24.92 15.39 24.94C15.61 24.97 15.83 24.99 16.05 25C16.19 25 16.34 25 16.48 25C17.12 25 17.76 24.96 18.39 24.9C18.56 24.88 18.73 24.85 18.9 24.82C19.71 24.68 20.52 24.5 21.31 24.26C22.1 24.03 22.87 23.74 23.62 23.4C23.77 23.33 23.91 23.25 24.05 23.17C24.38 23 24.7 22.8 25.01 22.58C25.24 22.41 25.46 22.22 25.68 22.03L24.03 20.38L22.11 18.47L20.19 16.56L18.28 14.65L16.36 12.73L14.44 10.81L12.53 8.89L10.61 6.97L8.7 5.06L6.78 3.14L4.87 1.22L3.15 2.95L4.16 4.12Z" fill="#757575"/>
    </svg>
);

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
        <label>Password<span className="required-asterisk">*</span></label>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', paddingRight: '30px' }} 
          />
          <button 
              onClick={() => setShowPassword(!showPassword)}
              style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  color: '#757575'
              }}
          >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
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
                    Registration successful! Redirecting to home page...
                </Alert>
            )}
            <button className="btn btn-primary" onClick={handleRegisterClick}>
            Register
            </button>
    </div>
  );
}

export default UserRegistration;
