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
import { template, templateSettings } from 'underscore';

Modal.setAppElement('#root');
//add new icons
export default function SupervisorCheckIn() {
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    columns: [
      { title: 'Family Name', field: 'last_name' },
      { title: 'Checked-in', field: 'checked_in' },
      { title: 'Onsite (7pm)', field: 'on_site_7pm' },
      { title: 'Onsite (10pm)', field: 'on_site_10pm' },
      { title: 'Beds Reserved', field: 'actual_beds_reserved' },
    ],
    data: [],
  });

  useEffect(() => {
    axiosWithAuth()
      .get('/logs')
      .then(res => {
        console.log('logs', res.data);
        let date = '2020-12-12T17:38:31.123Z';
        let copy = { ...state };

        let formattedData = res.data.filter(item => {
          if (item.time === date) return item;
          else return;
        });

        copy.data.push(...formattedData);
        console.log(copy);

        axiosWithAuth()
          .get('/members/1')
          .then(res => {
            copy = {
              ...copy,
              data: copy.data.map(item => {
                return { ...item, last_name: res.data.demographics.last_name };
              }),
            };
            console.log('copy', copy);
            setState(copy);
            setLoading(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        alert('error');
      });
  }, []);

  const toggleCheckedIn = rowData => {
    let temp = { ...rowData, checked_in: !rowData.checked_in };

    setState({
      ...state,
      data: state.data.map(item => {
        return { ...item, checked_in: !item.checked_in };
      }),
    });
  };

  const toggle7pm = () => {
    //on_site_7pm
    setState({
      ...state,
      data: state.data.map(item => {
        return { ...item, on_site_7pm: !item.on_site_7pm };
      }),
    });
  };
  const toggle10pm = () => {
    //on_site_10pm
    setState({
      ...state,
      data: state.data.map(item => {
        return { ...item, on_site_10pm: !item.on_site_10pm };
      }),
    });
  };

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
          actions={[
            {
              icon: HotelIcon,
              tooltip: 'Checked-in',
              onClick: (event, rowData) => {
                toggleCheckedIn(rowData);
              },
            },
            {
              icon: Brightness2Icon,
              tooltip: '7PM On-site',
              onClick: (event, rowData) => {
                toggle7pm();
              },
            },
            {
              icon: Brightness3Icon,
              tooltip: '10PM On-site',
              onClick: (event, rowData) => {
                toggle10pm();
              },
            },
          ]}
        />
      </div>
    </div>
  );
}
