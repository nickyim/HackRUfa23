import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
          <label htmlFor="professional">I am a professional</label>
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
