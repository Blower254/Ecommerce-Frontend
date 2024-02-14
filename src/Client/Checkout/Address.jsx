import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useBaseUrl } from '../../BaseUrlContext';
import { Form, Input, Button, Table, Modal, Card } from 'antd';
import { toast } from 'react-toastify';
import './Address.css';
import { Link } from 'react-router-dom';

function Address() {
  const { baseUrl } = useBaseUrl();
  const [addresses, setAddresses] = useState([]);
  const [hasAddress, setHasAddress] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [form] = Form.useForm();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, [baseUrl]);

  // Function to fetch addresses
  const fetchAddresses = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (userId) {
        const response = await axios.get(`${baseUrl}/api/address?userId=${userId}`);
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
  const handleAddAddress = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;

      if (userId) {
        const response = await axios.post(`${baseUrl}/api/address/add`, {
          user: userId,
          ...values,
        });

        setAddresses((prevAddresses) => [...prevAddresses, response.data]);
        toast.success('Address Added Successfully');
        form.resetFields();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address');
    }
  };

  // Function to handle form submission for updating an existing address
  const handleUpdateAddress = async (addressId, values) => {
    try {
      const response = await axios.put(`${baseUrl}/api/address/update/${addressId}`, values);

      setAddresses((prevAddresses) =>
        prevAddresses.map((address) =>
          address._id === addressId ? { ...address, ...response.data } : address
        )
      );

      // Reset selected address after update
      setSelectedAddressId(null);
      setUpdateModalVisible(false);
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  // Function to handle address deletion
  const handleDeleteAddress = async (addressId) => {
    try {
      await axios.delete(`${baseUrl}/api/address/delete/${addressId}`);
      setAddresses((prevAddresses) => prevAddresses.filter((address) => address._id !== addressId));
      setDeleteModalVisible(false);
      toast.success('Address Removed');
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Postal Code',
      dataIndex: 'postalCode',
      key: 'postalCode',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <>
        <div className = 'available-address default-nav-section'>
          <Button.Group>
            <Button onClick={() => { setSelectedAddressId(record._id); setUpdateModalVisible(true); }}>Update</Button>
            <Button onClick={() => { setDeleteModalVisible(true); setSelectedAddressId(record._id); }}>Delete</Button>
          </Button.Group>
          
            
        </div>
       
        </>
      ),
    },
  ];

  return (
    <div className='address-component'>
      <h1>Delivery Address</h1>
      {hasAddress ? (
        <div className='address-field'>
          <Table dataSource={addresses} columns={columns} />
          <div className='route-links'>
          <Link to='/products'>Continue Shopping</Link>
          <Link to='/checkout'>Proceed To Checkout</Link>
          </div>
        </div>
      ) : (
        <div className='address-form-component'>
          <p>No addresses found.</p>
          <Form onFinish={handleAddAddress} style={{maxWidth: '400px'}}>
            <Form.Item name="fullName" label="Full Name">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="city" label="City">
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Country">
              <Input />
            </Form.Item>
            <Form.Item name="postalCode" label="Postal Code">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Address
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      {/* Update modal */}
      <Modal
        title="Update Address"
        visible={updateModalVisible}
        onCancel={() => { setUpdateModalVisible(false); form.resetFields(); }}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          onFinish={(values) => handleUpdateAddress(selectedAddressId, values)}
        >
          <Form.Item name="fullName" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input />
          </Form.Item>
          <Form.Item name="city" label="City">
            <Input />
          </Form.Item>
          <Form.Item name="country" label="Country">
            <Input />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal Code">
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete confirmation modal */}
      <Modal
        title="Delete Address"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={() => handleDeleteAddress(selectedAddressId)}
      >
        <p>Are you sure you want to delete this address?</p>
      </Modal>
        
      
    </div>
  );
}

export default Address;
