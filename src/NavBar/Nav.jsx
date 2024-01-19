import React from 'react'
import {Link} from 'react-router-dom'
import ShoppingCart from '../Client/Cart/ShoppingCart'
function Nav() {
  return (
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
            <li className="nav-item ">
              <ShoppingCart/>
            </li>
          </ul>
        </nav>
  )
}

export default Nav