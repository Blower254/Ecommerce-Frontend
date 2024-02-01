import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
//import { useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrlContext';
const Home = () => {
  const [user, setUser] = useState(null);
  //const navigate = useNavigate();
  const {baseUrl} = useBaseUrl();

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

 

  return (
    <section>
      <p>Base Url {baseUrl}</p>
      {user ? (
        <div>
          Welcome , {user.email}
          
        </div>
      ) : (
        <div>User is logged out</div>
      )}
      {/* Other content */}
    </section>
  );
};

export default Home;
