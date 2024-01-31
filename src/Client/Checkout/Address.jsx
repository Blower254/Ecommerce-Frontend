import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Address() {
  const [addresses, setAddresses] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
  });

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  // Function to fetch addresses
  const fetchAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (userId) {
        const response = await axios.get(`http://localhost:5000/api/address?userId=${userId}`);
        setAddresses(response.data);
        if (response.data.length > 0) {
          setHasAddress(true);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  // Function to handle form submission for adding a new address
  const handleAddAddress = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (userId) {
        const response = await axios.post(`http://localhost:5000/api/address/add`, {
          user: userId,
          ...newAddress,
        });

        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
        setNewAddress({
          fullName: '',
          address: '',
          city: '',
          country: '',
          postalCode: '',
        });
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  };

  // Function to handle form submission for updating an existing address
  const handleUpdateAddress = async (addressId, updatedData) => {
    try {
        console.log(updatedData);
      const response = await axios.put(`http://localhost:5000/api/address/update/${addressId}`, updatedData);

      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === addressId ? { ...address, ...response.data } : address
        )
      );

      // Reset selected address after update
      setSelectedAddressId(null);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  return (
    <div>
      <h1>Delivery Address</h1>
      {hasAddress ? (
        <ul>
          {addresses.map((address) => (
            <li key={address._id}>
              <div>Full Name: {address.fullName}</div>
              <div>Address: {address.address}</div>
              <div>City: {address.city}</div>
              <div>Country: {address.country}</div>
              <div>Postal Code: {address.postalCode}</div>

              {/* Update button */}
              <button onClick={() => setSelectedAddressId(address._id)}>Update</button>

              {/* Add conditional rendering for update form */}
              {selectedAddressId === address._id && (
                <form onSubmit={() => handleUpdateAddress(address._id, /* pass updated data here */)}>
                  {/* Update form fields */}
                  <label>
                    Full Name:
                    <input
                      type="text"
                      value={newAddress.fullName}
                      onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                    />
                  </label>
                  <label>
                    Address:
                    <input
                      type="text"
                      value={newAddress.address}
                      onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type="text"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    />
                  </label>
                  <label>
                    Postal Code:
                    <input
                      type="text"
                      value={newAddress.postalCode}
                      onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
                    />
                  </label>
                  <button type="submit">Update Address</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <form onSubmit={handleAddAddress}>
            {/* Add form fields for new address */}
            <label>
              Full Name:
              <input
                type="text"
                value={newAddress.fullName}
                onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                value={newAddress.address}
                onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
              />
            </label>
            <label>
              City:
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                value={newAddress.country}
                onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                value={newAddress.postalCode}
                onChange={(e) => setNewAddress({ ...newAddress, postalCode: e.target.value })}
              />
            </label>
            <button type="submit">Add Address</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Address;
