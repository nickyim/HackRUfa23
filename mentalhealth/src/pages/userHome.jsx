import React from 'react';
import './UserHome.css';
//import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
function UserHome({ userName }) { // userName prop to display user's name
  return (
    <div className="user-home-container">

      {/* Welcome header */}
      <h1 style={{textAlign : 'center'}} >Welcome {userName}! Nice to see you!</h1>

      {/* "To Submissions" button */}
      <button>
        <a href="#submissions">To Submissions</a>
      </button>

      {/* Mission statement */}
      <div className="mission-statement">
        <h2 style ={{textAlign : 'center'}}> "[write mission statement here]"</h2>
        <p style={{textAlign: 'center'}}> "funies"</p>
      </div>

      {/* "Your Submissions:" section */}
      <div id="submissions" className="submissions-section">
        <h3>Your Submissions:</h3>
        <textarea defaultValue="[Your submissions content here]"></textarea>
      </div>

    </div>
  );
}

export default UserHome;
