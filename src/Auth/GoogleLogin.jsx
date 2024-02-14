import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Update the path accordingly
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Button } from 'antd';
import './Auth.css';

function GoogleLogin() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    try {
      // Create a new instance of GoogleAuthProvider
      const provider = new GoogleAuthProvider();

      // Use signInWithPopup to open a Google authentication pop-up
      const result = await signInWithPopup(auth, provider);

      const { accessToken, displayName, email, emailVerified, phoneNumber, photoURL, uid } = result.user;

      const user = {
        accessToken,
        displayName,
        email,
        emailVerified,
        phoneNumber,
        photoURL,
        uid
      };

      console.log("Google Login successful", result.user);

      // Update the user state with the authenticated user
      login(user);

      console.log("Current User", user);

      // Redirect to the '/' page after successful login
      navigate('/');
    } catch (error) {
      console.error("Error during Google login:", error.message);
    }
  };

  return (
    <Button
      className='google-login'
      onClick={handleLoginWithGoogle}
    >
      Continue With Google <FaGoogle className='google-icon' />
    </Button>
  );
}

export default GoogleLogin;