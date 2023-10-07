import React, { useState } from 'react';
import UserRegistration from './UserRegistration';
import ProfRegistration from './ProfRegistration';
import { Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

function RegistrationPage() {
  const [key, setKey] = useState('user'); // Default tab
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    // This can be expanded to handle any post-registration logic if needed
    navigate('/', { state: { fromRegistration: true } });
  };

  return (
    <div className="registration-page-container">
      <Tabs
        id="registration-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="user" title="User Registration">
          <UserRegistration onRegisterSuccess={handleRegistrationSuccess} />
        </Tab>
        <Tab eventKey="prof" title="Professional Registration">
          <ProfRegistration onRegisterSuccess={handleRegistrationSuccess} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default RegistrationPage;
