import React, { useState } from 'react';
import UserRegistration from './UserRegistration';
import ProfRegistration from './ProfRegistration';
import './RegistrationPage.css';

function RegistrationPage() {
    const [selectedTab, setSelectedTab] = useState("user");  // default to "user"

    return (
        <div className="registration-container">
            <div className="tabs-container">
                <button 
                    className={`tab ${selectedTab === "user" ? "tab-selected" : ""}`} 
                    onClick={() => setSelectedTab("user")}>
                    User Registration
                </button>
                <button 
                    className={`tab ${selectedTab === "prof" ? "tab-selected" : ""}`} 
                    onClick={() => setSelectedTab("prof")}>
                    Professional Registration
                </button>
            </div>
            
            <div className="form-container">
                {selectedTab === "user" ? <UserRegistration /> : <ProfRegistration />}
            </div>
        </div>
    );
}

export default RegistrationPage;
