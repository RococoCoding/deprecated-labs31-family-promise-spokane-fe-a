import React, { useEffect, useState } from 'react';

// UI
import { Divider } from 'antd';

// data fetching
import { axiosWithAuth } from '../../../api/axiosWithAuth';

// state
import { useSelector } from 'react-redux';

const GuestDashboard = () => {
  const user = useSelector(state => state.CURRENT_USER);

  useEffect(() => {
    console.log('familyid************', user);
    // axiosWithAuth().get('/getAllHouseholdInfo');
  });

  return (
    <div className="container">
      <h1>Guest dashboard</h1>
      <h1>Welcome To Family Promise of Spokane</h1>
      <h2>The facility has 12 beds left.</h2>
      <p> Would you like to check in? </p>
    </div>
  );
};

export default GuestDashboard;
