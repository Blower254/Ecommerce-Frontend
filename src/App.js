import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Category from './Client/Category/Category';
import ProductsPage from './Client/Products/ProductListing/ProductsPage';
import CreateProduct from './Admin/Products/CreateProduct';
//import TestCartFilter from './Client/Products/TestCartFilter';
import ShoppingCart from './Client/Cart/ShoppingCart';
import Filter from './Client/Filter/Filter';
import Checkout from './Client/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from './Client/Products/Product';

function App() {
  return (
    <Router>
      <div className="App">
       
        <nav className="main-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/category" className="nav-link">
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/product/:productId" className="nav-link">
                Product By Id
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/create-product" className="nav-link">
                Create Product
              </Link>
            </li>
            <li className="nav-item">
              <ShoppingCart/>
            </li>
          </ul>
        </nav>
        <div className="main-content">
          
          <Routes>
            <Route path="/category" element={<Category />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:productId" element={<Product/>} />

            <Route path="/admin/create-product" element={<CreateProduct />} />
            <Route path="/test" element={<Filter/>} />
            <Route path="/checkout" element={<Checkout/>} />

          </Routes>
        </div>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
