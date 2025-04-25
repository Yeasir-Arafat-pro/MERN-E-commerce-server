import React from 'react';
import { useLocation } from 'react-router-dom';
import "./UserProfile.css";

const UserProfile = () => {
  const { state } = useLocation();
  const { name, email, address, phone, image, role, banned } = state;

  return (
    <div className="profileContainer">
      <h1 className="profileTitle">👤 User Profile</h1>
      <div className="userProfileCard">
        <img className="profileImage" src={image} alt={name} />
        <div className="profileInfo">
          <h2>
            <span>Name:</span> {name}
          </h2>
          <p>
            <span>Email:</span> {email}
          </p>
          <p>
            <span>Address:</span> {address}
          </p>
          <p>
            <span>Phone:</span> {phone}
          </p>
          <p>
            <span>Role:</span> {role ? "Admin" : "User"}
          </p>
          <p className={banned ? "banned" : "notBanned"}>
            {banned ? "🚫 Banned" : "✅ Not Banned"}
          </p>
          <div className="profileButton">
          <button className="editButton">Edit Profile</button>
          <button className="deleteButton">Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
