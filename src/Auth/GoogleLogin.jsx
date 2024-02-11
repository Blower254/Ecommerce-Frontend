import React, { useContext } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase'; // Update the path accordingly
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
function GoogleLogin({ onGoogleSignIn }) {
    const navigate = useNavigate();
    const {login} = useContext(AuthContext);

    
    const handleLoginWithGoogle = async () => {
        try {
            // Create a new instance of GoogleAuthProvider
            const provider = new GoogleAuthProvider();

            // Use signInWithPopup to open a Google authentication pop-up
            const result = await signInWithPopup(auth, provider);
            login(result.user);

            const {accessToken, displayName, email, emailVerified, phoneNumber, photoURL, uid} = result.user;

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
            
            console.log("Current User", user); // This might not log the updated user immediately due to useState being asynchronous

            // Invoke the callback function passed from the parent component
            if (onGoogleSignIn) {
                onGoogleSignIn(result);
            }

            // Redirect to the '/account' page after successful login
            navigate('/');
        } catch (error) {
            console.error("Error during Google login:", error.message);
        }
    };

    return (
        <button
            className='btn google-login'
            onClick={handleLoginWithGoogle}
        >
            Continue With Google <FaGoogle className='google-icon' />
        </button>
    );
}

export default GoogleLogin;
