import React, { useContext, useState } from 'react';
import axios from 'axios';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useBaseUrl } from '../BaseUrlContext';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { Button } from 'antd';
import { toast } from 'react-toastify';
import Loading from '../Client/Loading/Loading';

function GoogleSignup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { baseUrl } = useBaseUrl();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupWithGoogle = async () => {
    try {
      setIsLoading(true); // Set loading to true when signup process starts

      const provider = new GoogleAuthProvider();
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

      const response = await axios.post(`${baseUrl}/api/signup`, user);
      const newUserFromServer = response.data.newUser;
      localStorage.setItem('user', JSON.stringify(newUserFromServer));

      login(user);

      console.log("Current User", user);

      navigate('/products');
      toast.success('Account Created Successfully');
    } catch (error) {
      toast.warning('Refresh for Better Performance');
      navigate('/');
      console.error("Error during Google signup:", error.message);
    } finally {
      setIsLoading(false); // Set loading to false when signup process is complete
    }
  };

  return (
    <Button
      className='google-signup'
      onClick={handleSignupWithGoogle}
      disabled={isLoading}
    >
      {isLoading ? <Loading /> : 'Signup With Google'} <FaGoogle className='google-icon' />
    </Button>
  );
}

export default GoogleSignup;
