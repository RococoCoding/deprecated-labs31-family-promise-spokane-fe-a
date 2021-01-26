import React, { useEffect, useState } from 'react';
import OffHours from './OffHours';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

// UI
import { Divider, Button } from 'antd';
// import '../../../styles/app.scss'

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';

const GuestDashboard = ({ fetchHousehold, fetchFamily }) => {
  const user = useSelector(state => state.CURRENT_USER);

  const fetchFamilyInformation = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);

      const family = res.data.family;

      fetchFamily(family.id);
    } catch (error) {
      alert('error');
    }
  };

  //  const familyLogs = async () => {
  //   try {
  //     const res = await axiosWithAuth()
  //   .get('/logs')
  //   .then(res=>{
  //     console.log('logs',res.data);
  //   });

  //   } catch (error) {
  //     alert('error');
  //   }
  // };
  axiosWithAuth()
    .get('/logs')
    .then(res => {
      console.log('logs', res.data);
    });

  //Reserve button
  const reserveButton = () => {
    /*
    1. This button will have a post request to set the user's check in as true
    2. Number of beds will be updated
    3. Message will pop ups stating: Congratulations, you have reserved XX amount of beds at 904 E Hartson Ave, Spokane, WA 99202 for MM/DD/YYY. Please be sure to have at least ONED ADULT available at the shelter before 7pm to check in with the supervisor.
    <inSmallerText>If you do not show ip with your total amont of family members, those beds will be reserved for other guests.</inSmallerText>
    */
  };

  useEffect(() => {
    // this endpoint needs a family id to work
    // todo:
    // need to fetch family first with userID to get family
    // then get household with family id.
    // fetchFamily();
    fetchFamilyInformation();
  }, []);

  //For Date and time
  const date = Date();
  const hours = new Date().getHours();
  const standard = hours => {
    if (hours > 12) {
      return hours - 12;
    }
  };

  return 7 < hours < 21 ? (
    <div className="container">
      {console.log('family request', fetchFamilyInformation)}
      {date}
      {/* {console.log(familyLogs)} */}
      <h1>Guest dashboard</h1>
      <h1>Welcome To Family Promise of Spokane</h1>
      <h2>There are currently XX number of beds remaining at the shelter</h2>
      {/* If the current number of beds == 0, 
      return <p>To join the waitlist, please click below</p> <button>Join Waitlist</button>
      Message: Please be sure to arrive at the shelter by 7pm. 
      The supervisor will announce if there are any more beds available.
      */}
      <p>
        {' '}
        If you would like to reserve XX beds, please click the button below:{' '}
      </p>
      {/*
      Will need make a ternary statement here that will pull in the data determining if the member has already made a reservation. 
      if member has a reservation
        This will render a component containing a box that shows the guest's reservation.
      */}
      <Button className="button">Reserve Beds</Button>
    </div>
  ) : (
    <OffHours />
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
