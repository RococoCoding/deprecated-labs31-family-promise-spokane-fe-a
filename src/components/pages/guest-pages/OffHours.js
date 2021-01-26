import React, { useEffect, useState } from 'react';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

// UI
import { Divider, Button } from 'antd';
// import '../../../styles/app.scss'

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';

const OffHours = ({ fetchHousehold, fetchFamily }) => {
  const user = useSelector(state => state.CURRENT_USER);

  return (
    <div className="container">
      <h1></h1>
      <p>Beds can be reserved between 7am and 9pm.</p>
      <p>Please come back between 7am and 9pm to make a reservation.</p>
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

export default OffHours;
