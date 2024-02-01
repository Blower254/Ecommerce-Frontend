import React, { useState, useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { FaUserCircle } from "react-icons/fa";
import "./Nav.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import ShoppingCart from '../Client/Cart/ShoppingCart';
import logo from './logo.png';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className=" navbar-expand-lg navbar-light bg-light navbar">
      <Link className="navbar-brand logo-section" to="/">
        <img src={logo} alt='Home' className="logo"/>
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleMenu}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenuAlt3 />}
      </button>

      <div
        className={classNames("collapse navbar-collapse collapse-section", {
          show: isOpen,
        })}
      >
        <ul className="navbar-nav ml-auto "> {/* Use ml-auto to align links to the right on large devices */}
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/Products">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/category">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/admin/create-product">
              Add Product
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" to="/explore">
              Explore
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link navbar-links" >
              <ShoppingCart/>
            </Link>
          </li>
        </ul>

        <div className="user-info">
          {user ? (
            <div className="user">
              <Link to='/profile' className="user-content">
                <FaUserCircle className="icon profile-icon" /> 
              {` ${user.email}`}
              </Link>
              <Link to="/logout" className="nav-logout"  onClick={handleLogout}>
                Logout
              </Link>
            </div>
          ) : (
            <div className="auth">
              <Link to="/auth/signup" className="nav-link">
                Sign Up
              </Link>
              <Link to="/auth/login" className="nav-link">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
