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
  const [editedQuantities, setEditedQuantities] = useState({});
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`);
      toast.success('Item removed from cart');
      fetchCart();
    } catch (error) {
      toast.error('Error removing item from cart');
      console.error(error);
    }
  };

  const handleCheckout = () => {
    toast("Happy Shopping 😊");
    handleClose();
    navigate('/checkout');
  };

  const handleViewProduct = (item) => {
    navigate(`/product/${item.productId}`);
  };

  const handleRefresh = () => {
    try {
      fetchCart();
      toast("Refresh Success!");
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;
      const response = await axios.get(`http://localhost:5000/api/cart?userId=${userId}`);
      const cartData = response.data.cart;
      setCartItems(cartData);
    } catch (error) {
      toast.error('Error fetching cart');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []); 

  const toggleEditQuantity = (item) => {
    setEditedQuantities({
      ...editedQuantities,
      [item.cartItemId]: item.quantity,
    });
    setIsEditingQuantity(!isEditingQuantity);
  };

  const handleIncrement = (cartItemId) => {
    setEditedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [cartItemId]: (prevQuantities[cartItemId] || 1) + 1,
    }));
  };

  const handleDecrement = (cartItemId) => {
    if ((editedQuantities[cartItemId] || 1) > 1) {
      setEditedQuantities((prevQuantities) => ({
        ...prevQuantities,
        [cartItemId]: (prevQuantities[cartItemId] || 1) - 1,
      }));
    }
  };

  const handleQuantityChange = async (item) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/update`, {
        cartItemId: item.cartItemId,
        quantity: editedQuantities[item.cartItemId],
      });

      toast.success('Quantity updated successfully');
      fetchCart();
      setIsEditingQuantity(false);
    } catch (error) {
      toast.error('Error updating quantity');
      console.error(error);
    }
  };

  return (
    <div className='shopping-cart'>
      <div>
        <FaCartShopping className='nav-cart-icon' onClick={handleShow} />
        <span className='cart-item-count'>{cartItems.length}</span>
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
                <div key={item.cartItemId} className="cart-item-component" >
                  <div className='cart-img-component'>
                    <img src={item.image} alt="cart pic" className='cart-img' />
                  </div>
                  <div className='item-fields'>
                    <div className='cart-item-title' onClick={() => handleViewProduct(item)}>{item.title}</div>
                    <div className='item-info'>
                      <div className='cart-desc'>{item.description}</div>
                      <div className='cart-category'>{/*  category  */}</div>
                      <div className='cart-price'>{item.price}</div>
                    </div>
                  </div>
                  <div className='delete-icon-section'>
                    {isEditingQuantity ? (
                      <div className='quantity-edit'>
                        <button className='quantity-button' onClick={() => handleDecrement(item.cartItemId)}>
                          -
                        </button>
                        <input
                          type='number'
                          className='quantity-input'
                          value={editedQuantities[item.cartItemId] || 1}
                          onChange={(e) => setEditedQuantities({
                            ...editedQuantities,
                            [item.cartItemId]: parseInt(e.target.value, 10) || 1,
                          })}
                          min='1'
                        />
                        <button className='quantity-button' onClick={() => handleIncrement(item.cartItemId)}>
                          +
                        </button>
                        <Button
                          variant='success'
                          size='sm'
                          className='edit-quantity-button'
                          onClick={() => handleQuantityChange(item)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className='cart-price'>{item.quantity}</div>
                        <Button
                          variant='primary'
                          size='sm'
                          className='edit-quantity-button'
                          onClick={() => toggleEditQuantity(item)}
                        >
                          Edit
                        </Button>
                        <MdDelete
                          className='cart-delete-icon'
                          size='sm'
                          onClick={() => removeFromCart(item.cartItemId)}
                        />
                      </>
                    )}
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
