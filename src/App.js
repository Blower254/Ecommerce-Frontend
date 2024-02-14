import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Category from './Client/Category/Category';
import ProductsPage from './Client/Products/ProductListing/ProductsPage';
//import CreateProduct from './Admin/Products/CreateProduct';
import Filter from './Client/Filter/Filter';
import Checkout from './Client/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Client/Products/Product';
import Nav from './NavBar/Nav';
import Auth from './Auth/Auth';
import Login from './Auth/Login/Login';
import Signup from './Auth/Signup/Signup';
import Home from './Pages/Homepage/Home';
import Profile from './UserProfile/Profile';
//import ProductCreate from './Admin/Product/ProductCreate';
//import YourFormComponent from './Admin/Product/ProductCreate copy';
import ProductCreates from './Admin/Product/ProductCreate copy';
import EmbedChatComponent from './EmbeddedChatComponent';
import PageNotFound from './PageNotFound';
import Address from './Client/Checkout/Address';

function App() {
  const isAuthRoute = window.location.pathname.startsWith('/auth');

  return (
    <Router>
      <div className="App">
        {isAuthRoute ? null : <Nav />} {/* Conditionally render Nav */}
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />

            <Route path="/category" element={<Category />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/signup" element={<Signup/>} />

            <Route path="/admin/create-product" element={<ProductCreates/>} />
            <Route path="/test" element={<Filter />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/delivery-address" element={<Address/>} />

            <Route path="*" element={<PageNotFound/>} />

          </Routes>
          <EmbedChatComponent/>
        </div>
        <ToastContainer 
           position="top-center"
           autoClose={3000}
           hideProgressBar
           newestOnTop={false}
           closeOnClick
           rtl={false}
           pauseOnFocusLoss
           draggable
           pauseOnHover
           toastContainerStyle={{ top: '50%', transform: 'translateY(-50%)' }}
        />
      </div>
    </Router>
  );
}

export default App;
