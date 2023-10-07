import React, { useState } from 'react';
import UserRegistration from './UserRegistration';
import ProfRegistration from './ProfRegistration';

function RegistrationPage() {
  const [selectedTab, setSelectedTab] = useState('user');  // 'user' or 'prof'

  return (
    <div>
      <div className="tab-nav">
        <button 
          className={selectedTab === 'user' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('user')}>
          User Registration
        </button>
        <button 
          className={selectedTab === 'prof' ? 'active-tab' : ''}
          onClick={() => setSelectedTab('prof')}>
          Professional Registration
        </button>
      </div>

      {selectedTab === 'user' && <UserRegistration />}
      {selectedTab === 'prof' && <ProfRegistration />}
    </div>
  );
}

export default RegistrationPage;
