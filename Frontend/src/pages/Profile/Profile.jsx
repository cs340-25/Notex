import React from 'react';
import './Profile.scss';

function Profile() {
  const mockUser = {
    username: 'john doe',
    email: 'jdoe@example.com',
    joined: 'January 1, 2000',
  };

  return (
    <div className="ProfileCont">
      <h1 className="ProfileHeader">User Profile</h1>
      <div className="ProfileCard">
        <p><strong>Username:</strong> {mockUser.username}</p>
        <p><strong>Email:</strong> {mockUser.email}</p>
        <p><strong>Joined:</strong> {mockUser.joined}</p>
      </div>
    </div>
  );
}

export default Profile;