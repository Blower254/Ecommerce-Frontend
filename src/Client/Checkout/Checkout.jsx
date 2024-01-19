import React, { useState, useEffect } from 'react';
import { FaArrowsRotate } from 'react-icons/fa6';
import { MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import './Checkout.css'; // Import the external CSS file

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

 
  const handleRefresh = () =>{
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
    toast("Refresh Success");

    const total = storedCartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };


  useEffect(() => {
    // Fetch cart items from local storage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);

    // Calculate total price
    const total = storedCartItems.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, []);

  const updateTotalPrice = (updatedCart) => {
    const total = updatedCart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    updateTotalPrice(updatedCart);
  };

  const handlePayment = (method) => {
    // Handle payment logic based on the selected method
    toast(`Processing payment with ${method}`);
  };

  return (
    <div className="checkout-container">
      {/* Cart Section */}
      <div className="checkout-cart-section">
        <div className='component-header'>
          <div className='checkout-header'>
            <h2 className="checkout-cart-title">Your Cart</h2>
          </div>
          <div className='checkout-refresh '><FaArrowsRotate onClick={handleRefresh}/> </div>
          <div className='total-component'>        
            <p className="checkout-total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <ul className="checkout-cart-items">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-cart-item">
              <div className="checkout-cart-img">
                <img src={item.image} alt="cart img" className="checkout-cart-img" />
              </div>
              <div className="checkout-item-fields">
                <div className="checkout-cart-item-title">{item.title}</div>
                <div className="checkout-item-info">
                  <div className="checkout-cart-desc">{item.description}</div>
                  <div className="checkout-cart-category">{item.category}</div>
                  <div className="checkout-cart-price">$ {item.price}</div>
                </div>
              </div>
              <div className="checkout-delete-icon-section">
                <MdDelete
                  className="checkout-cart-delete-icon"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Checkout Section */}
      <div className="checkout-payment-section">
        <h2 className="checkout-title">Checkout</h2>
        <p className="checkout-payment-method">Select Payment Method:</p>
        <button className="checkout-payment-button" onClick={() => handlePayment('PayPal')}>
          PayPal
        </button>
        <button className="checkout-payment-button" onClick={() => handlePayment('Mpesa')}>
          Mpesa
        </button>
        <button className="checkout-payment-button" onClick={() => handlePayment('Stripe')}>
          Stripe
        </button>
      </div>
    </div>
  );
}

export default Checkout;
