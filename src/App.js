import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Category from './Client/Category/Category';
import ProductsPage from './Client/Products/ProductListing/ProductsPage';
import CreateProduct from './Admin/Products/CreateProduct';
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

function App() {
  const isAuthRoute = window.location.pathname.startsWith('/auth');

  return (
    <Router>
      <div className="App">
        {isAuthRoute ? null : <Nav />} {/* Conditionally render Nav */}
        
        <div className="main-content">
          
          <Routes>
            <Route path="/" element={<Home/>} />

            <Route path="/category" element={<Category />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<Product />} />
            <Route path="/auth/*" element={<Auth />} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/signup" element={<Signup/>} />

            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/test" element={<Filter />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
