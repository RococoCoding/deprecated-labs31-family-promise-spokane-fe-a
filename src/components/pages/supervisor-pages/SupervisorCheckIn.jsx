import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import MaterialTable from 'material-table';
import LoadingComponent from '../../common/LoadingComponent';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { tableIcons } from '../../../utils/tableIcons';
import PeopleIcon from '@material-ui/icons/People';
import FlagIcon from '@material-ui/icons/Flag';
import HotelIcon from '@material-ui/icons/Hotel';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { Switch } from 'antd';
import { template, templateSettings } from 'underscore';

Modal.setAppElement('#root');
//add new icons

let dummy = [
  {
    actual_beds_reserved: 5,
    beds_reserved: 5,
    date: '2020-12-12T17:38:31.123Z',
    family_id: 1,
    members_staying: ['Thomas Shelby', 'Laura Shelby', 'Tim Shelby'],
    on_site_7pm: true,
    on_site_10pm: true,
    reservation_id: 1,
    reservation_status: true,
    supervisor_id: '00u2lh0bsAliwLEe75d6',
    time: '2020-12-12T17:38:31.123Z',
    waitlist: false,
  },
  {
    actual_beds_reserved: 5,
    beds_reserved: 3,
    date: '2020-12-12T17:38:31.123Z',
    family_id: 2,
    members_staying: ['frodo baggins', 'bilbo baggins'],
    on_site_7pm: true,
    on_site_10pm: true,
    reservation_id: 2,
    reservation_status: true,
    supervisor_id: '00u2lh0bsAliwLEe75d6',
    time: '2020-12-12T17:38:31.123Z',
    waitlist: false,
  },
];

export default function SupervisorCheckIn() {
  const [loading, setLoading] = useState(false);

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Reservation', field: 'reservation_status' },
      { title: 'Reservation ID', field: 'reservation_id' },
      { title: 'Onsite (7pm)', field: 'on_site_7pm' },
      { title: 'Onsite (10pm)', field: 'on_site_10pm' },
      { title: 'Beds Reserved', field: 'beds_reserved' },
    ],
    data: [],
  });

  const clickHandler = (e, item) => {
    console.log('clicked', e, item);
  };

  const cancelReservation = (e, name, id) => {
    console.log(e, name, id);
    // axiosWithAuth()
    // .get('/families/')
  };

  //1)get all logs
  //2)filter by date (using filter by a random reservation ID for now as
  //no date yet)
  //3) display all guests with reservation
  useEffect(() => {
    axiosWithAuth()
      .get('/logs')
      .then(res => {
        console.log(res.data);

        let results = res.data.filter(d => {
          if (d.reservation_id === 7) return d;
          else return;
        });

        let temp = [];
        for (let i = 0; i < results.length; i++) {
          results[i].members_staying.map(item => {
            temp.push({
              name: item,
              family_id: results[i].family_id,
              reservation_status: (
                <Switch
                  defaultChecked={true}
                  onChange={e => {
                    cancelReservation(e, item, this.family_id);
                  }}
                />
              ),
              reservation_id: results[i].reservation_id,
              on_site_7pm: <Switch />,
              on_site_10pm: (
                <Switch
                  onChange={e => {
                    clickHandler(e, item);
                  }}
                />
              ),
              beds_reserved: results[i].beds_reserved,
            });
          });
          setState({ ...state, data: temp });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="guest-table-container">
      <div className="guest-table">
        <MaterialTable
          options={{
            exportButton: true,
            rowStyle: rowData => ({
              backgroundColor:
                rowData.flag_level == 2
                  ? 'rgba(255, 255, 0, 0.419)'
                  : rowData.flag_level == 3
                  ? 'rgba(255, 0, 0, 0.418)'
                  : 'white',
            }),
          }}
          icons={tableIcons}
          title="Guests Check-in"
          columns={state.columns}
          data={state.data}
        />
      </div>
    </div>
  );
}
