import React, { useState, useEffect } from 'react';
//redux
import { connect } from 'react-redux';
import actions from '../../state/actions/families';

//components
import SupervisorAnalitcs from './supervisor-pages/SupervisorAnalytics';
import GuestAnalitics from './guest-pages/GuestAnalytics';

import { useSelector } from 'react-redux';

const Analytics = ({ fetchHousehold, fetchFamily }) => {
  useEffect(() => {
    fetchFamily();
    fetchHousehold();
  }, []);

  const user = useSelector(state => state.CURRENT_USER);

  return (
    <div className="dashboard-container">
      {user.role == 'supervisor' ? <SupervisorAnalitcs /> : <GuestAnalitics />}
    </div>
  );
};

function mapStateToProps(state) {
  return { state };
}

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
