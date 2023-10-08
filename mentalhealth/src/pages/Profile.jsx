import React, { useState, useEffect } from "react";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase-config"; // Adjust the path to your Firebase configuration
import "./Profile.css";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState(""); // Storing password on the client side can be risky
  const [pronouns, setPronouns] = useState("");
  const [age, setAge] = useState("");
  const [struggle, setStruggle] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [proffesional, setProffesional] = useState(0);
  const [access, setAccess] = useState(0);

  useEffect(() => {
    // Ensure there's a logged-in user
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      // Create a reference to the user's data in the database
      const userRef = ref(db, "users/" + uid);

      // Fetch user data
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFirstName(data.firstName || "");
          setLastName(data.lastName || "");
          setPassword(data.password || "");
          setPronouns(data.pronouns || "");
          setAge(data.age || "");
          setStruggle(data.struggle || "");
          setBio(data.bio || "");
          setProfilePicture(data.profilePicture || null);
          setProffesional(data.proffesional || 0);
          setAccess(data.access || 0);
        }
      });
    }
  }, []);

  return (
    <div className="profile-container landing-container">
      <div className="profile-content login-form">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h1>
          {firstName} {lastName}
        </h1>
        <div className="profile-info">
          <p>
            <strong>Pronouns:</strong> {pronouns}
          </p>
          <p>
            <strong>Age:</strong> {age}
          </p>
          <p>
            <strong>Struggle:</strong> {struggle}
          </p>
          <p>
            <strong>Bio:</strong> {bio}
          </p>
          <p>
            <strong>Professional:</strong> {proffesional === 1 ? "Yes" : "No"}
          </p>
          <p>
            <strong>Access:</strong> {access}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
