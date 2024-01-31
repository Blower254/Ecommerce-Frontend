import React, { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import './Checkout.css';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import Address from './Address';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCart(); // Fetch cart items on component mount
  });

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;
      const response = await axios.get(`https://ecommerce-api-k87g.onrender.com/api/cart?userId=${userId}`);
      const cartData = response.data.cart;
      console.log(cartData);
      if (Array.isArray(cartData) && cartData.length > 0) {
        setCartItems(cartData);
      } else {
        setCartItems([]);
        toast.info('Your cart is empty.');
      }
    } catch (error) {
      toast.error('Error fetching cart');
      console.error(error);
    }
  };


  useEffect(() => {
    // Check if cartItems is not undefined or empty before calculating total price
    if (Array.isArray(cartItems) && cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
    }
  }, [cartItems]);


  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`https://ecommerce-api-k87g.onrender.com/api/cart/remove/${itemId}`);
      toast.success('Item removed from cart');
      fetchCart(); // Refresh the cart immediately after removing an item
    } catch (error) {
      toast.error('Error removing item from cart');
      console.error(error);
    }
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
          <div className='total-component'>        
            <p className="checkout-total-price">Total Price: ${totalPrice}</p>
          </div>
        </div>
        <ul className="checkout-cart-items">
          {Array.isArray(cartItems) && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <li key={item.id} className="checkout-cart-item">
                <div className="checkout-cart-img">
                  <img src={item.image} alt="checkout pic" className='cart-img' />
                </div>
                <div className="checkout-item-fields">
                  <div className="checkout-cart-item-title">{item.title}</div>

                  <div className="checkout-item-info">
                    <div className="checkout-cart-desc">{item.description}</div>
                    <div className="checkout-cart-price">$ {item.price}</div>
                  </div>
                </div>
                <div className='delete-icon-section'>
                    <div className='cart-price'>{item.quantity}</div>
                    <MdDelete className="cart-delete-icon" size="sm" onClick={() => removeFromCart(item.cartItemId)} />
                  </div>
              </li>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ul>
        <Link to='/products' className='nav-link'>Continue Shopping</Link>
      </div>
      <div>
        <Address/>
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
