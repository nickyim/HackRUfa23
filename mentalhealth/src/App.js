import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import ProfHome from './pages/ProfHome';
import UserRegistration from './pages/UserRegistration'; // Import UserRegistration

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Placeholder for authentication logic.
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/userhome" element={loggedIn ? <UserHome /> : <Navigate to="/" />} />
        <Route path="/profhome" element={loggedIn ? <ProfHome /> : <Navigate to="/" />} />
        <Route path="/register" element={<UserRegistration />} /> {/* Route for registration */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
