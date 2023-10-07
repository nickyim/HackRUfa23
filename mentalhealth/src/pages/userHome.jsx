import React from 'react';

function UserHome({ userName }) { // userName prop to display user's name
  return (
    <div className="user-home-container">

      {/* Welcome header */}
      <h1>Welcome {userName}! Nice to see you!</h1>

      {/* "To Submissions" button */}
      <button>
        <a href="#submissions">To Submissions</a>
      </button>

      {/* Mission statement */}
      <div className="mission-statement">
        <textarea defaultValue="[write mission statement here]"></textarea>
      </div>

      {/* "Your Submissions:" section */}
      <div id="submissions" className="submissions-section">
        <h2>Your Submissions:</h2>
        <textarea defaultValue="[Your submissions content here]"></textarea>
      </div>

    </div>
  );
}

export default UserHome;
