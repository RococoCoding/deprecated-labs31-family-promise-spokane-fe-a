import React, { useState, useEffect } from 'react';

//components
import SupervisorAnalitcs from './supervisor-pages/SupervisorAnalytics';
import GuestAnalitics from './guest-pages/GuestAnalytics';

import { useSelector } from 'react-redux';

const Analytics = () => {
  const user = useSelector(state => state.CURRENT_USER);

  return (
    <div className="dashboard-container">
      {user.role == 'supervisor' ? <SupervisorAnalitcs /> : <GuestAnalitics />}
    </div>
  );
};

export default Analytics;
