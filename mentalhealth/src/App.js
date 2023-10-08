import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import ProfHome from './pages/ProfHome';
import RegistrationPage from './pages/RegistrationPage';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { // <-- Place useEffect here, in the main body of App component
       const unsubscribe = onAuthStateChanged(auth, user => {
           if (user) {
               setLoggedIn(true);
           } else {
               setLoggedIn(false);
           }
       });

       return () => unsubscribe();  // Clean up on component unmount
   }, []);
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
        <Route path="/register" element={loggedIn ? <RegistrationPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={loggedIn ? <Profile /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
