import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './Auth.css';
import GoogleLogin from './GoogleLogin';

function Auth() {
  const navigate = useNavigate(); 
 
  const handleLogin = () => {
    navigate('/auth/login'); 
  };

  // Function to handle signup button click
  const handleSignup = () => {
    navigate('/auth/signup');
  };

  return (
    <div className="auth-container">
      <Button className='login-button' onClick={handleLogin}>Login</Button>
      <Button className='signup-button' onClick={handleSignup}>Signup</Button>
      <GoogleLogin />
    </div>
  );
}

export default Auth;
