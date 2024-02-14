import React, { useState } from 'react';
import { Menu, Table } from 'antd';
import'./AccountActivities.css';

const { SubMenu } = Menu;

function AccountActivities() {
  const [currentMenu, setCurrentMenu] = useState('pendingPayment'); // Set default selected menu

  const handleClick = (e) => {
    setCurrentMenu(e.key);
  };

  // Sample data for each menu option
  const sampleData = {
    pendingPayment: [
      { key: '1', description: 'Item 1', unitPrice: '$10', status: 'Pending', operation: 'Edit' },
      { key: '2', description: 'Item 2', unitPrice: '$15', status: 'Pending', operation: 'Edit' },
    ],
    pendingDispatch: [
      { key: '3', description: 'Item 3', unitPrice: '$20', status: 'Pending', operation: 'Edit' },
      { key: '4', description: 'Item 4', unitPrice: '$25', status: 'Pending', operation: 'Edit' },
    ],
    inTransit: [
      { key: '5', description: 'Item 5', unitPrice: '$30', status: 'In Transit', operation: 'Track' },
      { key: '6', description: 'Item 6', unitPrice: '$35', status: 'In Transit', operation: 'Track' },
    ],
    completed: [
      { key: '7', description: 'Item 7', unitPrice: '$40', status: 'Completed', operation: 'View' },
      { key: '8', description: 'Item 8', unitPrice: '$45', status: 'Completed', operation: 'View' },
    ],
    cancelled: [
      { key: '9', description: 'Item 9', unitPrice: '$50', status: 'Cancelled', operation: 'Reorder' },
      { key: '10', description: 'Item 10', unitPrice: '$55', status: 'Cancelled', operation: 'Reorder' },
    ],
  };

  // Columns configuration for the table
  const columns = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
    },
  ];

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[currentMenu]} mode="horizontal">
        <SubMenu key="sub1" title="Account Activities">
          <Menu.Item key="pendingPayment">Pending Payment</Menu.Item>
          <Menu.Item key="pendingDispatch">Pending Dispatch</Menu.Item>
          <Menu.Item key="inTransit">In Transit</Menu.Item>
          <Menu.Item key="completed">Completed</Menu.Item>
          <Menu.Item key="cancelled">Cancelled</Menu.Item>
        </SubMenu>
      </Menu>
      <div className="content">
        <Table columns={columns} dataSource={sampleData[currentMenu]} pagination={false} />
      </div>
    </div>
  );
}

export default AccountActivities;
