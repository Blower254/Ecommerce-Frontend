// Checkout.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useBaseUrl } from '../../BaseUrlContext';
import PayWithGoogle from './PayWithGoogle';

const Checkout = () => {
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();

  // State to store the fetched address
  const [address, setAddress] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Get user ID from local storage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user._id);
    }
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
       
        if (userId) {
          const response = await axios.get(`${baseUrl}/api/address?userId=${userId}`);
          setAddress(response.data.address || 'Address not available'); // Assuming the address is directly available in response.data
          console.log(response.data);
          if (!response.data.address) {
            navigate('/delivery-address');
          }
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        // Handle error (e.g., show a message to the user)
      }
    };

    fetchAddress();
  }, [baseUrl, userId]);

  return (
    <div>
      <p>{address.split('|').join(' | ')}</p>
      <PayWithGoogle />
    </div>
  );
};

export default Checkout;
