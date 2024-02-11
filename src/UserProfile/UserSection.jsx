import React from 'react';
import { Card, Button } from 'antd';
import profilePlaceholder from './profile-placeholder.png';
import './UserSection.css';
import { Image } from 'react-bootstrap';



const { Meta } = Card;

const UserSection = ({ user }) => {
   


  return (
    <Card className="profile-card" style={{ width: "100%" }}>
      <Meta
        title={`Welcome, ${user.displayName || "Customer" }`}
        description={
          <div className='user-data'>
            <Image src={user.photoURL || profilePlaceholder} alt='user-avater' rounded/>
            <p>{user.displayName || <Button> Add Display Name </Button> }</p>
            <p>{user.email} {user.emailVerified? "Verified" : <Button> Verify Email </Button>}</p>
            <p> {user.phoneNumber || <Button>Add Phone Number</Button>}</p>
            {/* Add more user details as needed */}
          </div>
          
        }

      />
    <span>Joined Date: {user.metadata.creationTime}</span>

    </Card>
  );
}

export default UserSection; // Ensure the component is properly exported
