import React, { useEffect, useState } from 'react';

// UI
import { Divider } from 'antd';

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';

const GuestDashboard = ({ fetchHousehold, fetchFamily }) => {
  const user = useSelector(state => state.CURRENT_USER);

  useEffect(() => {
    // this endpoint needs a family id to work
    // todo:
    // need to fetch family first with userID to get family
    // then get household with family id.
    fetchFamily();
  }, []);

  return (
    <div className="container">
      <h1>Guest dashboard</h1>
      <h1>Welcome To Family Promise of Spokane</h1>
      <h2>The facility has 12 beds left.</h2>
      <p> Would you like to check in? </p>
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDashboard);
