import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import GoogleLogin from './GoogleLogin';

function Auth() {


  return (
    <div className="auth-container">
      <div className="auth-image-section"></div>
      <div className="auth-actions-section">
        {/* Use Link for navigation to /login */}
        <Link to="/auth/login" className="login-button">
          Login
        </Link>
        
        {/* Use Link for navigation to /signup */}
        <Link to="/auth/signup" className="create-account-button">
          Create Account
        </Link>

        <GoogleLogin/>
      </div>
    </div>
  );
}

export default Auth;
