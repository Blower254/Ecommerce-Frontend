import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaArrowsRotate, FaCartShopping } from 'react-icons/fa6';
import './ShoppingCart.css';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function ShoppingCart() {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to remove an item from the cart
  const removeFromCart = async (itemId) => {
    try {
      // Make a DELETE request to remove the item from the cart
      console.log(itemId);
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      toast.success('Item removed from cart');
      // After successful removal, refresh the cart
      fetchCart();
  
      // Display a success message
     
    } catch (error) {
      // Display an error message if the removal fails
      toast.error('Error removing item from cart');
      console.error(error);
    }
  };
  

  const handleCheckout = () => {
    toast("Happy Shopping 😊");
    handleClose();
    navigate('/checkout', { cartItems: cartItems }); // Pass the cart items to the checkout page
  };

  const handleRefresh = async () => {
    try {
      fetchCart();
      toast("Refresh Success!");
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle the error as needed
    }
  };
  

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;
      const response = await axios.get(`http://localhost:5000/api/cart?userId=${userId}`);
      const cartData = response.data.cart;
      console.log(cartData);
      setCartItems(cartData);
    } catch (error) {
      toast.error('Error fetching cart');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className='shopping-cart'>
      <div>
        <FaCartShopping className='nav-cart-icon' onClick={handleShow} />
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="off-canvas">
        <Offcanvas.Header closeButton className='offcanvas-hearder'>
          <Offcanvas.Title className='offcanvas-title'>Shopping Cart</Offcanvas.Title>
          <div className='refresh-button'><FaArrowsRotate className='refresh' onClick={handleRefresh} /></div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className='cart-items'>
              {cartItems.map(item => (
                  <div key={item.productId} className="cart-item-component">
                    <div className='cart-img-component'>
                      <img src={item.image} alt="cart pic" className='cart-img' />
                    </div>
                    <div className='item-fields'>
                      <div className='cart-item-title'>{item.title}</div>
                      <div className='item-info'>
                        <div className='cart-desc'>{item.description}</div>
                        <div className='cart-category'>{item.category}</div>
                        <div className='cart-price'>{item.price}</div>
                      </div>
                    </div>
                    <div className='delete-icon-section'>
                      <MdDelete className="cart-delete-icon" size="sm" onClick={() => removeFromCart(item.productId)} />
                    </div>
                  </div>
                ))}

            </ul>
          )}
        </Offcanvas.Body>
        <div className='checkout-section'>
          <Button className="checkout-btn" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </Offcanvas>
    </div>
  );
}

export default ShoppingCart;
