// CartContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useBaseUrl } from '../BaseUrlContext';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { baseUrl } = useBaseUrl();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch cart items when component mounts
    fetchCart();
  }, []); // Empty dependency array ensures it runs only once on mount
  
  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems]);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;
      const response = await axios.get(`${baseUrl}/api/cart?userId=${userId}`);
      const cartData = response.data.cart;
      setCartItems(cartData);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;

      const newItem = { ...product, userId, quantity: 1 };
      const updatedItem = { ...newItem, productId: newItem._id };

      // Make a POST request to add item to the cart
      const response = await axios.post(`${baseUrl}/api/cart/add`, updatedItem);
      toast.success(response.data.message);
     
      // Update local state with the new cart items
      setCartItems((prevCartItems) => [...prevCartItems, updatedItem]);
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('An error occurred while adding the item to the cart.');
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;
      await axios.delete(`${baseUrl}/api/cart/remove/${cartItemId}?userId=${userId}`);
      setCartItems((prevCartItems) => prevCartItems.filter(item => item.cartItemId !== cartItemId));
      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('An error occurred while removing the item from the cart.');
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const { _id: userId } = user;

      // Make a PUT request to update the quantity of the item in the cart
      await axios.put(`${baseUrl}/api/cart/update`, { cartItemId, quantity: newQuantity });

      // If the request is successful, no need to update local state
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new Error('Error updating quantity');
    }
  };
  
  const calculateTotalPrice = () => {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalPrice(totalPrice);
  };

  return (  
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateCartItemQuantity, setCartItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
