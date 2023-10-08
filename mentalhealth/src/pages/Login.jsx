import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { ref, set } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./Login.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalCode, setProfessionalCode] = useState("");

  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (isProfessional) {
      onLogin(true);
      navigate("/profhome");
    } else {
      onLogin(false);
      navigate("/userhome");
    }
  };

  const handleCreateAccountClick = () => {
    navigate("/register");
  };

  const GoogleLogIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/register");
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ... You can add more error handling if needed
      });
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
          <label className="checkbox-label" htmlFor="professional">
            I am a professional
          </label>
        </div>

        {isProfessional && (
          <input
            className="professional-code-input"
            type="text"
            placeholder="Enter professional code"
            value={professionalCode}
            onChange={(e) => setProfessionalCode(e.target.value)}
          />
        )}

        <button onClick={handleLoginClick}>Login</button>
      </div>

      <div className="create-account">
          <a href="#" onClick={handleCreateAccountClick}>Create New Account</a>
      </div>
      <div className="google-login">
        <button onClick={GoogleLogIn}>Login with Google</button>
      </div>
    </div>
  );
}

export default Login;
