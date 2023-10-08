import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { get,ref, set } from "firebase/database";
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
      .then(async (result) => {
          // Get the user's UID
          const uid = result.user.uid;
          
          // Create a reference to the user's "access" field in the database
          const proffesionalRef = ref(db, 'users/' + uid + '/access');

          try {
              const snapshot = await get(proffesionalRef);

              if (snapshot.exists()) {
                  const proffesional = snapshot.val();
                  
                  if (proffesional === 1) {
                      navigate('/profhome');
                  } else if (proffesional === 0) {
                      navigate('/userhome');
                  } else {
                      console.error("Unexpected value for access:", proffesional);
                      // Handle or navigate to a default route if needed
                  }
              } else {
                  console.error("Access field not found for user:", uid);
                  // Handle or navigate to a default route if needed
              }
          } catch (error) {
              console.error("Error checking access field:", error);
              // Handle or navigate to a default route if needed
          }
      })
      .catch((error) => {
        // Handle Errors here
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;  // Ensure safe access with optional chaining
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ... You can add more error handling if needed
      });
};

const GoogleSignUp = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithPopup(auth, provider)
    .then(async (result) => {
          navigate("/register");

    })
    .catch((error) => {
      // Handle Errors here
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData?.email;  // Ensure safe access with optional chaining
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ... You can add more error handling if needed
    });
};

  return (
    <div className="landing-container">
      <h1>Welcome to HeartToHeart</h1>

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
      <div className="google-login">
        <button onClick={GoogleLogIn}>Login with Google</button>
        <button onClick={GoogleSignUp}>Sign up with Google</button>
      </div>
      <div>
          

      </div>
      
  
  <button className="mission-statement" onClick={() => navigate("/MissionStatement")}>
    Read our mission statement</button>
  

    </div>
  );
}

export default Login;
