import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaArrowsRotate, FaCartShopping } from 'react-icons/fa6';
import './ShoppingCart.css';
import { MdDelete } from "react-icons/md";
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ShoppingCart() {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const Navigate = useNavigate();
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
   
    const updatedCart = cartItems.filter(item => item.id !== itemId);
   
    setCartItems(updatedCart);
  };
  
  

  const handleCheckout = (storedCartItems) =>{
    toast("Happy Shopping 😊")
    handleClose();
    Navigate('/checkout');
  }
  const fetchStoredData = (e) =>{
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  }
  const handleRefresh = () =>{
    fetchStoredData();
    toast("Refresh Success!")
  };

 
  return (
    <div className='shopping-cart'>
      <div>
        <FaCartShopping className='nav-cart-icon' onClick={handleShow} />
      </div>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="off-canvas">
        <Offcanvas.Header closeButton className='offcanvas-hearder'>
          <Offcanvas.Title className='offcanvas-title'>Shopping Cart</Offcanvas.Title>
          <div className='refresh-button'><FaArrowsRotate className='refresh' onClick={handleRefresh}/></div>
        </Offcanvas.Header>
        <Offcanvas.Body >
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className='cart-items'>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-component">
                  <div className='cart-img-component'>
                    <img src={item.image} alt="cart pic" className='cart-img'/>
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
                      <MdDelete className="cart-delete-icon" size="sm" onClick={() => removeFromCart(item.id)}/>
                  </div>

                </div>
              ))}
            </ul>
          )}
          
          
        </Offcanvas.Body>
        <div className='checkout-section'>
            <Button className="checkout-btn" onClick={() => {
              handleCheckout()
            }}>
              Checkout
            </Button>
            
          </div>
      </Offcanvas>
    </div>
  );
}

export default ShoppingCart;
