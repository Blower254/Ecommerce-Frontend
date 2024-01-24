// Profile.jsx

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import profilePlaceholder from './profile-placeholder.png';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        console.log(user);
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="profile-container mt-5">
      {user ? (
        <div>
          <h2 className="profile-title">User Profile</h2>
          <div className="profile-card">
            <img
              src={user.photoURL || profilePlaceholder}
              alt="Profile"
              className="profile-image img-fluid"
            />
            <h5 className="profile-title">Welcome, {user.displayName || user.email}</h5>
            <p className="profile-text">User ID: {user.uid}</p>
            <p className="profile-text">Email: {user.email}</p>
            <p className="profile-text">Phone Number: {user.phoneNumber || "Null"}</p>
            <p className="profile-text">Email Verified: {user.emailVerified ? 'Yes' : 'No'}</p>
            <span className="profile-text">Joined Date: {user.metadata.creationTime}</span>
            {/* Add more user details as needed */}
          </div>
        </div>
      ) : (
        <div>User is logged out. Please log in to view the profile.</div>
      )}
    </div>
  );
}

export default Profile;
