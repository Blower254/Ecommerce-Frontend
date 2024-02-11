import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import UserSection from './UserSection'; // Ensure UserSection is imported
import AccountActivities from './AccountActivities'; // Ensure AccountActivities is imported
import './Profile.css';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

function Profile() {
  const [user, setUser] = useState(null);

      const {navigate} = useNavigate();
  
      const handleLogout = () => {
          // Perform logout action
          console.log("Logging out...");
          
          signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            toast("Signed out successfully")
          }).catch((error) => {
            console.log("Error!");
          });
        };


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
            <div className='logout-component'>
             <Button  onClick={handleLogout} className="logout-btn">Logout <LogoutOutlined /> </Button>
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
