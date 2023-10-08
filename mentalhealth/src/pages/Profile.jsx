import React, { useState } from 'react';

const Profile = ({ userData, isOwner }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: userData.name,
    email: userData.email,
  });

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    // Save the edited user information to the backend
    // Then, set isEditMode to false
    setIsEditMode(false);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setEditedUserData({ ...editedUserData, name: newName });
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEditedUserData({ ...editedUserData, email: newEmail });
  };

  return (
    <div>
      <h2>User Profile</h2>
      {isEditMode ? (
        // Edit mode
        <div>
          <input type="text" value={editedUserData.name} onChange={handleNameChange} />
          <input type="text" value={editedUserData.email} onChange={handleEmailChange} />
          {/* Other editable fields */}
          <button onClick={handleSaveClick}>Save</button>
        </div>
      ) : (
        // View mode
        <div>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          {/* Other view-only fields */}
          {isOwner && <button onClick={handleEditClick}>Edit</button>}
        </div>
      )}
    </div>
  );
};

export default Profile;
