import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here (like sending a request to your server)
    console.log(`Logging in with username: ${username} and password: ${password}`);
  };

  return (
    <div className="login-container">
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
