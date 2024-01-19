import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Auth() {
  // Function to handle signup with Google
  const handleSignupWithGoogle = () => {
    // Implement your Google signup logic here
    console.log('Signing up with Google');
  };

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

        <button className="continue-with-google-button" onClick={handleSignupWithGoogle}>
          Continue with Google
        </button>
      </div>
    </div>
  );
}

export default Auth;
