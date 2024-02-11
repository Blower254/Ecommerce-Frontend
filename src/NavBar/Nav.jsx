import React, { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import classNames from "classnames";
import {  Button, Menu } from "antd";
import "./Nav.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import ShoppingCart from '../Client/Cart/ShoppingCart';
import logo from './logo.png';
import { FaUserCircle } from "react-icons/fa";


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
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar-expand-lg navbar-light bg-light navbar">
      <Link className="navbar-brand logo-section" to="/">
        <img src={logo} alt='Home' className="logo"/>
      </Link>
      
      <div
        className={classNames("collapse navbar-collapse collapse-section", {
          show: isOpen,
        })}
      >
        <Menu mode="horizontal" onClick={closeMenu}>
          <Menu.Item key="products">
            <Link to="/Products">Products</Link>
          </Menu.Item>
          <Menu.Item key="categories">
            <Link to="/category">Categories</Link>
          </Menu.Item>
          <Menu.Item key="addProduct">
            <Link to="/admin/create-product">Add Product</Link>
          </Menu.Item>
          <Menu.Item key="explore">
            <Link to="/explore">Explore</Link>
          </Menu.Item>
        </Menu>
        
        
      </div>
      <div className="cart-icon-section">
          <ShoppingCart/>

        </div>
      <div className="user-info">
          {user ? (
           <>
                <Link to='/profile' className="user-id"><FaUserCircle className="user-icon"/>{user.displayName|| "Customer Account"}</Link>
       
                <Button  onClick={handleLogout}>Logout</Button>
           </>   
          ) : (
            <div className="auth">
              <Link to="/auth/signup" className="nav-link">
                <Button>Sign Up</Button>
              </Link>
              <Link to="/auth/login" className="nav-link">
              <Button>Login</Button>
              </Link>
            </div>
          )}
        </div>
        <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
          >
            {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

    </nav>
  );
};

export default Navbar;
