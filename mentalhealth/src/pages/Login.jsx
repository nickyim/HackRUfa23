import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import './Login.css';

function GoogleLogIn(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalCode, setProfessionalCode] = useState('');

  const navigate = useNavigate();

  const handleLoginClick = () => {
    // For now, any input will allow login
    // In the future, you would add authentication logic here
    if (isProfessional) {
      onLogin(true);  // if professional, pass true to App's handleLogin
      navigate('/profhome'); // navigate to professional home page
    } else {
      onLogin(false);  // if not professional, pass false to App's handleLogin
      navigate('/userhome');  // navigate to user home page
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/register");  // Navigate to UserRegistration page
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Mental Health App</h1>
      
      <div className="login-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <div className="professional-check">
            <input
                type="checkbox"
                id="professional"
                checked={isProfessional}
                onChange={() => setIsProfessional(!isProfessional)}
            />
            <label className="checkbox-label" htmlFor="professional">I am a professional</label>
        </div>
        
        {isProfessional && (
          <input
            type="text"
            placeholder="Enter professional code"
            value={professionalCode}
            onChange={(e) => setProfessionalCode(e.target.value)}
          />
        )}

        <button onClick={handleLoginClick}>
          Login
        </button>
      </div>

      <div className="create-account">
        <button onClick={handleCreateAccountClick}>
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;
