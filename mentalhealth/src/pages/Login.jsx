import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isProfessional, setIsProfessional] = useState(false);
  const [professionalCode, setProfessionalCode] = useState('');

  const handleLogin = () => {
    // You can put your login logic here.
    // For now, I'll just log to the console.
    console.log('Login button clicked!');
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

        <button onClick={handleLogin}>
          Login
        </button>
      </div>

      <div className="create-account">
        <button onClick={() => { console.log('Create New Account Clicked!'); }}>
          Create New Account
        </button>
      </div>
    </div>
  );
}

export default Login;
