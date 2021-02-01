import React, { useEffect, useState } from 'react';

import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { tableIcons } from '../../../utils/tableIcons';
import PeopleIcon from '@material-ui/icons/People';
// import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
// import { CopyrightOutlined } from '@material-ui/icons';
import LoadingComponent from '../../common/LoadingComponent';
import Modal from 'react-modal';
import '../Guests/guest.css';
// import { CardContent, Card } from '@material-ui/core';
import GuestMoreInfo from '../Guests/GuestMoreInfo';
import { Checkbox } from '@material-ui/core';
import axios from 'axios';
import Visuals from './Visuals';
Modal.setAppElement('#root');

const CaseAnalytics = ({}) => {
  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [result, setResult] = useState(null);
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [visualization, setVisualization] = useState({});
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
      { title: 'Guest Id', field: 'id' },
    ],
    data: [],
  });
  function toggleModal(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.id,
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            flag_level: 0,
            ...member,
          };
        });

        copy.data.push(...formattedData);

        setState(copy);
      })
      .catch(err => {
        alert('error in fetch for members');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const runVisualization = guestId => {
    console.log(guestId);
    //condidtional, if guestID is null, alert user to click on ONE row
    //guest id is not coming through, for now it is hardcoded
    axiosWithAuth()
      .get(
        `http://omar-zaffar.eba-rpnihjrj.us-east-1.elasticbeanstalk.com/Visualizations/1`
      )
      .then(response => {
        console.log(response.data);
        //setVisualization(response.data)
      })
      .catch(err => {
        alert('error in DS API ');
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
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        className="mymodal"
        overlayClassName="myoverlay"
        closeTimeoutMS={500}
      >
        {result ? <GuestMoreInfo familyInfo={result} /> : ''}
      </Modal>
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
            title="Case Analytics"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: Checkbox,
                tooltip: 'Select Guest',
                onClick: (event, rowsData) => {
                  setGuestId(state.data[rowsData.id - 1].id);
                },
              },
            ]}
          />
          <div>
            <button key={guestId} onClick={() => runVisualization(guestId)}>
              Run Visualization
            </button>
          </div>
          <div>
            {/* uncomment this when ready to use visuals */}
            {/* <Visuals visuals={visualization} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaseAnalytics;
