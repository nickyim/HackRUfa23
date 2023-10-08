// ProfHome.jsx
import React from "react";
import "./ProfHome.css";
import Submissions from "../components/Submissions";
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

const ProfHome = () => {

  const navigate = useNavigate();

  return (
    <div className="profhome-container">
      <header>
        <h1>Welcome Back!</h1>
      </header>
        {/* Profile Icon Button */}
        <Button variant="light" className="profile-icon-button" onClick={() => navigate('/profile')}>
            <i className="bi bi-person-circle"></i>
        </Button>
      <section className="mission-statement">
        <h2>To Our Professionals</h2>
        <p>
We wanted to take a moment to express our deepest gratitude for your incredible contributions to our mental health support platform. Your selfless dedication and willingness to extend a helping hand, even in the form of short responses, have made an immeasurable impact on the lives of many.

Your small efforts have touched the lives of countless individuals who were in desperate need of support and understanding. Each response you provided carried with it a ray of hope, comfort, and a sense of not being alone in their struggles.

It's often said that small acts of kindness can create ripples of positive change, and you've exemplified this truth beautifully. Your compassion and empathy have not only provided solace to those seeking help but have also demonstrated the incredible power of human connection.

In a world where mental health challenges can often feel isolating and overwhelming, you have been the beacon of light that guides others toward healing and resilience. Your generosity in sharing your time and expertise is nothing short of inspiring.

Thank you for being the heart and soul of our mission. Your commitment to making mental health support accessible to all is shaping a brighter and more compassionate world for us all. We are profoundly grateful for your unwavering support.</p>
      </section>

      <section className="submission-section">
        <h2>Submissions:</h2>
        <Submissions />
      </section>
    </div>
  );
};

export default ProfHome;
