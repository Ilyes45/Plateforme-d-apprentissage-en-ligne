import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Profile.css';

const Profile = () => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div className='profile'>
      <h1>User Profile</h1>
      <Card className="profile-card">
        <Card.Img
          variant="top"
          src={user?.image || "https://placehold.co/180"}
          alt="Profile"
        />
        <ListGroup variant="flush">
          <ListGroup.Item>{user?.name}</ListGroup.Item>
          <ListGroup.Item>{user?.email}</ListGroup.Item>
          <ListGroup.Item>{user?.phone}</ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Profile;
