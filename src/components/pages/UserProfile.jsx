import { Divider } from 'antd';
import React from 'react';

const UserProfile = () => {
  return (
    <div className="user-container">
      <div className="profile-header-container">
        <header className="profile-header"></header>
        <img
          className="profile-image"
          src="https://source.unsplash.com/random"
          alt=""
          srcset=""
        />
      </div>
    </div>
  );
};

export default UserProfile;
