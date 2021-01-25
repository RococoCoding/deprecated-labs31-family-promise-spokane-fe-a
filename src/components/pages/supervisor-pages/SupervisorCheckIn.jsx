import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import MaterialTable from 'material-table';
import LoadingComponent from '../../common/LoadingComponent';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { tableIcons } from '../../../utils/tableIcons';

Modal.setAppElement('#root');

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

            setState(copy);
            setLoading(false);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        alert('error');
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
          title="Guests Check-in for 2020-12-12"
          columns={state.columns}
          data={state.data}
        />
      </div>
    </div>
  );
}
