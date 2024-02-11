import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import UserSection from './UserSection'; // Ensure UserSection is imported
import AccountActivities from './AccountActivities'; // Ensure AccountActivities is imported
import './Profile.css';
function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
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
    <div className="profile-container ">
      {user ? (
        <div>
          <div className='accout-center'>
            <div>
              <UserSection user={user} />
            </div>
            <div>
              <AccountActivities />
            </div>
          </div>
        </div>
      ) : (
        <div>User is logged out. Please log in to view the profile.</div>
      )}
    </div>
  );
}

export default Profile;
