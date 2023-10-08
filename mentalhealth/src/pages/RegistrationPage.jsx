import React, { useState } from 'react';
import UserRegistration from './UserRegistration';
import ProfRegistration from './ProfRegistration';
import {db,auth} from "../firebase-config";
import {ref,get} from 'firebase/database';
import { Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

function RegistrationPage() {
  const [key, setKey] = useState('user'); // Default tab
  const navigate = useNavigate();
  const handleRegistrationSuccess = async () => {
    try {
      // Get the current user's UID
      const uid = auth.currentUser.uid;

      // Create a reference to the user's "proffesional" field in the database
      const professionalRef = ref(db, 'users/' + uid + '/proffesional');
      const accessRef = ref(db, 'users/' + uid + '/access');
      const ss = await get(accessRef);
      const access = ss.val();
      // Fetch the value of "proffesional" from the database
      const snapshot = await get(professionalRef);

      if (snapshot.exists()) {
          const proffesional = snapshot.val();
          
          if (proffesional === 1) {
            if(access == 1){
              navigate('/profhome');
            }else{
              navigate('/pending-approval');
            }
          } else if (proffesional === 0) {
              navigate('/userhome');
          } else {
              // Default navigation if "proffesional" is neither 0 nor 1
              navigate('/', { state: { fromRegistration: true } });
          }
      } else {
          // If "proffesional" field doesn't exist in the database, navigate to default
          console.error("Proffesional field not found for user:", uid);
          navigate('/', { state: { fromRegistration: true } });
      }
  } catch (error) {
      console.error("Error checking proffesional field:", error);
      navigate('/', { state: { fromRegistration: true } });
  }
};

  return (
    <div className="registration-page-container">
      <Tabs
        id="registration-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="user" title="User Registration">
          <UserRegistration onRegisterSuccess={() => handleRegistrationSuccess()} />
        </Tab>
        <Tab eventKey="prof" title="Professional Registration">
          <ProfRegistration onRegisterSuccess={() => handleRegistrationSuccess('/pending-approval')} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default RegistrationPage;
