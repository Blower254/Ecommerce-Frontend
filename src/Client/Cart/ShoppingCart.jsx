import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MdDelete, MdOutlinePreview, MdSave } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Card, Input, Modal, Space } from 'antd';
import { FaPen } from 'react-icons/fa6';
import Link from 'antd/es/typography/Link';
import { CartContext } from '../CartContext';
import './ShoppingCart.css';

function ShoppingCart() {
  const [show, setShow] = useState(false);
  const [editedQuantities, setEditedQuantities] = useState({});
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const { removeFromCart, cartItems, updateCartItemQuantity, setCartItems, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCheckout = () => {
    toast("Happy Shopping 😊");
    handleClose();
    navigate('/checkout');
  };

  const handleCardClick = (item) => {
    navigate(`/product/${item.productId}`);
    handleClose();
  };

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
      const newQuantity = editedQuantities[item.cartItemId];
      if (newQuantity !== undefined) {
        // Update the quantity of the item in the cart
        // This is a placeholder for your actual API call to update the quantity
        // Replace it with your actual API call to update the quantity
        await updateCartItemQuantity(item.cartItemId, newQuantity);

        // Update the cart items state with the updated quantity
        const updatedCartItems = cartItems.map(cartItem => {
          if (cartItem.cartItemId === item.cartItemId) {
            return { ...cartItem, quantity: newQuantity };
          }
          return cartItem;
        });
        setCartItems(updatedCartItems);
      }

      // Exit edit mode
      setIsEditingQuantity(false);
    } catch (error) {
      toast.error('Error updating quantity');
      console.error(error);
    }
  };

  return (
    <div className='shopping-cart'>
      <div className='cart-section'>
        <Link onClick={handleShow}>Cart</Link>
        <span className='cart-item-count'>{cartItems.length}</span>
      </div>

      <Modal title="Shopping Cart" visible={show} onCancel={handleClose} footer={null}>
        {cartItems.length === 0 ? (
          <h2>Your cart is empty.</h2>
        ) : (
          <Space 
            direction="vertical"  
            className='cart-card-component'

          >
            <h3 className='total-price'>Total Price: ${totalPrice}</h3>
            
            {cartItems.map(item => (
              <Card 
                key={item.cartItemId}
               
                actions={[
                  <MdDelete
                    className='cart-trigger-icon'
                    onClick={() => removeFromCart(item.cartItemId)}
                    title='Remove From Cart'
                  />,
                  <MdOutlinePreview 
                    className='cart-trigger-icon' 
                    onClick={() => handleCardClick(item)}
                    title='Preview Item'
                  />,
                  isEditingQuantity ? (
                    <MdSave className='cart-trigger-icon' onClick={() => handleQuantityChange(item)} title='Save'/>
                  ) : (
                    <FaPen
                      className='cart-trigger-icon'
                      onClick={() => toggleEditQuantity(item)}
                      title='Edit Quantity'
                    />
                  )
                ]}
              >
                <Space >
                  <img src={item.image} alt="cart pic" className='cart-img' />
                  <div>
                    <h4 strong>{item.title}</h4>
                    <h5>Price: ${item.price}</h5>
                    {isEditingQuantity ? (
                      <Space className='edit-section'>
                        <Button onClick={() => handleDecrement(item.cartItemId)}>-</Button>
                        <Input
                          type='number'
                          value={editedQuantities[item.cartItemId] || 1}
                          onChange={(e) => setEditedQuantities({
                            ...editedQuantities,
                            [item.cartItemId]: parseInt(e.target.value, 10) || 1,
                          })}
                          min={1}
                        />
                        <Button onClick={() => handleIncrement(item.cartItemId)}>+</Button>
                      </Space>
                    ) : (
                      <Space>
                        <h6>Quantity: {item.quantity}</h6>
                      </Space>
                    )}
                  </div>
                </Space>
              </Card>
            ))}
                        
            <Card className='card-footer'>
              <Button type="primary" onClick={handleCheckout} >Proceed To Checkout</Button>
            </Card>
          </Space>
        )}
      </Modal>
    </div>
  );
}

export default ShoppingCart;
