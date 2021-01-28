import React, { useEffect, useState } from 'react';
import OffHours from './OffHours';

import { axiosWithAuth } from '../../../api/axiosWithAuth';

// UI
import { Divider, Button, Checkbox } from 'antd';
// import '../../../styles/app.scss'

//redux
import actions from '../../../state/actions/families';
import { connect } from 'react-redux';

// state
import { useSelector } from 'react-redux';

//mock Data
import { AddBoxOutlined } from '@material-ui/icons';
import CurrentReservation from './CurrentReservation';
import axios from 'axios';

const GuestDashboard = ({ fetchHousehold, fetchFamily, fetchMembers }) => {
  // The current user
  const user = useSelector(state => state.CURRENT_USER);

  //UserState
  const [users, setUsers] = useState([]);

  //Mock beds counter
  const [count, setCount] = useState(60);
  // axiosWithAuth()
  //   .get('/beds')
  //   .then(res => {
  //     console.log('beds', res.data);
  //   });
  // For Members Staying
  const [membersStaying, setMembersStaying] = useState([]);

  // For Waitlist
  const [waitList, setWaitList] = useState([]);

  //logs user state of reservation status
  const [isReserved, setIsReserved] = useState(false);
  useEffect(() => {
    axiosWithAuth()
      .get('/logs')
      .then(res => {
        // console.log("Logs",res.data);
        // console.log(membersStaying);
        // setIsReserved(
        //   res.data.forEach((checkStatus, id) => {
        //     console.log(
        //       'id, checked, members staying',
        //       id,
        //       checkStatus.reservation_status,
        //       membersStaying[id]
        //     );
        //     return checkStatus;
        //   })
        // );

        //a.) This array looks different in the console.log but normal in the React Dev tool's state.
        setMembersStaying(
          res.data.map(stay => {
            return stay.member_staying;
            // console.log('stay',stay.members_staying); //a. Need to ask if the hard-coded names can be removed.
          })
        );
        setWaitList(
          res.data.map(wait => {
            return wait.waitlist;
          })
        );
      });
  }, []);

  // console.log('Is Reserved', isReserved);
  //THIS COULD BE A FUNCTION BECAUSE IT IS BEING USED TWICE:
  // This will target the checked members and add or take them away from the holding array or state of the membersStaying list. It will also update the state of the count for total beds.
  const familyStaying = e => {
    if (e.target.checked === true) {
      if (count > 0) {
        setCount(count - 1);
      }

      if (membersStaying.indexOf(e.target.value) === -1)
        setMembersStaying([...membersStaying, e.target.value]);
      console.log('membersStaying', membersStaying);
    } else if (e.target.checked === false) {
      setCount(count + 1);

      let temp = membersStaying;
      temp = temp.filter(item => {
        if (item !== e.target.value) return item;
        else return;
      });
      setMembersStaying(temp);
    }
  };

  // This will target the checked members and add or take them away from the holding array or state of the waitlist.
  const waitListMembers = e => {
    if (e.target.checked === true) {
      if (waitList.indexOf(e.target.value) === -1);
      setWaitList([...waitList, e.target.value]);
      console.log('waitlist', waitList);
    } else if (e.target.checked === false) {
      let temp = waitList;
      temp = temp.filter(item => {
        if (item !== e.target.value) return item;
        else return;
      });
      setWaitList(temp);
    }
  };

  //This function is pulling in data from 2 apis. The second api (/families/:id/members) is getting the family information which is holding the state of the users.
  const fetchFamilyInformation = async () => {
    try {
      const res = await axiosWithAuth().get(`/users/${user.id}/family`);

      const family = res.data.family;
      console.log('fetchFamilyInformation', family);

      axiosWithAuth()
        .get(`/families/${family.id}/members`)
        .then(res => {
          console.log('res', res);
          setUsers(res.data);
        })
        .then(members => {
          console.log('Members', members);
        })
        .catch(err => console.log('get family error'));
    } catch (error) {
      alert('error');
    }
  };
  useEffect(() => {
    console.log('fetch', fetchFamilyInformation());
  }, [count]);

  //Reserve button
  const reserveButton = () => {
    /*
    1. This button will have a post request to the logs api to set the families check in as true in the members staying array
    2. Number of beds will be updated
    3. Message will pop ups stating: Congratulations, you have reserved XX amount of beds at 904 E Hartson Ave, Spokane, WA 99202 for MM/DD/YYY. Please be sure to have at least ONED ADULT available at the shelter before 7pm to check in with the supervisor.
    <inSmallerText>If you do not show ip with your total amont of family members, those beds will be reserved for other guests.</inSmallerText>
    4. condition that onClick, currentReservation component will show.
    */
  };

  // the cancel button
  const cancelButton = () => {
    /*
    1. This button will change the membersStaying array length to 0
    2. Number of beds will be updated
    3. Message will pop ups stating: You have canceled your reservation, if you want to reserve, please refresh this page and make another reservation.
    */
  };

  //For Date and time
  const date = new Date();
  const fullDate = date.toDateString();
  const hours = new Date().getHours();
  const getMinutes = new Date().getMinutes();
  const minutes = (getMinutes < 10 ? '0' : '') + getMinutes;
  //This seconds will not be seen, but this will allow the clock to rerender accordingly.
  const [seconds, setSeconds] = useState();
  let sec = new Date().getSeconds();
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(sec);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  const standard = hours => {
    if (hours > 12) {
      return hours - 12;
    }
  };

  return 7 < hours < 21 ? (
    <div className="container">
      {`Today is ${fullDate} ${hours}:${minutes}`}

      <h1>Guest dashboard</h1>
      <h1>Welcome To Family Promise of Spokane</h1>
      <h2>
        There are currently {count} number of beds remaining at the shelter
      </h2>
      {
        // CurrentReservation === True ?
        //<CurrentReservation/>
        //:
      }

      {count === 0 ? (
        //WAITLIST ________________________________
        <>
          <p>To join the waitlist, please click below</p>
          {users.map(member => {
            return (
              <div>
                <Checkbox
                  value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  onChange={waitListMembers}
                >
                  {member.demographics.first_name}{' '}
                  {member.demographics.last_name}
                </Checkbox>
              </div>
            );
          })}
          <Button className="button">Reserve Beds</Button>
          <p>
            Message: Please be sure to arrive at the shelter by 7pm. The
            supervisor will announce if there are any more beds available
          </p>
        </>
      ) : (
        //MEMBERS STAYING ___________________________
        <>
          <p>
            {' '}
            If you would like to reserve {membersStaying.length} beds, please
            click the button below:{' '}
          </p>

          {users.map(member => {
            return (
              <div>
                <Checkbox
                  value={`${member.demographics.first_name} ${member.demographics.last_name}`}
                  onChange={familyStaying}
                >
                  {member.demographics.first_name}{' '}
                  {member.demographics.last_name}
                </Checkbox>
              </div>
            );
          })}
          <Button className="button">Reserve Beds</Button>
        </>
      )}
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
  fetchBeds: actions.fetchBeds,
  fetchMembers: actions.fetchMembers,
};

export default connect(mapStateToProps, mapDispatchToProps)(GuestDashboard);
