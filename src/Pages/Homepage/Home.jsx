import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        setUser(user);
        console.log("uid", uid);
      } else {
        // User is signed out
        setUser(null);
        console.log("user is logged out");
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
        // Perform logout action
    console.log("Logging out...");
        
    signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log("Error!");
        });

    window.location.reload();
    navigate('/');
  };

  return (
    <section>
      {user ? (
        <div>
          Welcome, {user.email}
          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div>User is logged out</div>
      )}
      {/* Other content */}
    </section>
  );
};

export default Home;
