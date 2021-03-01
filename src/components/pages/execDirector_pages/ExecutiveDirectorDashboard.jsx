import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Circle from 'react-circle';

import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { tableIcons } from '../../../utils/tableIcons';
import FlagIcon from '@material-ui/icons/Flag';
// import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
// import { CopyrightOutlined } from '@material-ui/icons';
import LoadingComponent from '../../common/LoadingComponent';
import Modal from 'react-modal';
import './execDirector.css';
// import { CardContent, Card } from '@material-ui/core';
import GuestMoreInfo from '../Guests/GuestMoreInfo';
import Plot from 'react-plotly.js';
import mockData from './mock-data.json';
Modal.setAppElement('#root');

const ExecutiveDirectorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', col_type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', col_type: 'date' },
      { title: 'Relationship', field: 'relationship' },
    ],
    data: [],
  });
  function toggleModal(e) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  // on hold pending stakeholder feedback; not sure if needed on exec dashboard

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        console.log(res.data);
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            flag_level: 0,
            ...member,
          };
        });

        copy.data.push(...formattedData);
        console.log(copy);

        setState(copy);
      })
      .catch(err => {
        alert('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // GET 90 day exit breakdown
  const [exitBreakdown, setExitBreakdown] = useState();
  useEffect(() => {
    axios
      .get(
        'http://fam-prom-the-end.eba-jknbh7ge.us-east-1.elasticbeanstalk.com/exit-pie/90'
      )
      .then(res => {
        console.log(res.data);
        setExitBreakdown(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // GET 90 day moving average
  const [movingAverage, setMovingAverage] = useState();
  useEffect(() => {
    axios
      .get(
        'http://fam-prom-the-end.eba-jknbh7ge.us-east-1.elasticbeanstalk.com/exit-moving-avg/90/365'
      )
      .then(res => {
        console.log(res.data);
        setMovingAverage(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [guestId, setGuestId] = useState(null);
  const [result, setResult] = useState(null);
  const history = useHistory();

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <>
      <div className="data-viz-container">
        <div className="mock-data">
          <h2>Mock Data</h2>
          <Plot className="MockData" data={mockData.data} />
        </div>
        <div className="exit-breakdown-90-day">
          <h2>Exit Breakdown - 90 Day</h2>
          <Plot className="ExitBreakdown90Day" data={exitBreakdown} />
        </div>
        <div className="moving-average-90-day">
          <h2>Moving Average - 90 Day</h2>
          <Plot className="MovingAverage90Day" data={movingAverage} />
        </div>
        <div className="carrying-capacity">
          <h2>Carrying Capacity</h2>
          <Circle
            animate={true} // Boolean: Animated/Static progress
            animationDuration="4s" //String: Length of animation
            // responsive={true} // Boolean: Make SVG adapt to parent size
            size={380} // Number: Defines the size of the circle.
            lineWidth={10} // Number: Defines the thickness of the circle's stroke.
            progress={43} // Number: Update to change the progress and percentage.
            progressColor="#006FBA" // String: Color of "progress" portion of circle.
            bgColor="whitesmoke" // String: Color of "empty" portion of circle.
            textColor="#8D4982" // String: Color of percentage text color.
            textStyle={{
              font: 'bold 5rem Helvetica, Arial, sans-serif', // CSSProperties: Custom styling for percentage.
            }}
            percentSpacing={10} // Number: Adjust spacing of "%" symbol and number.
            roundedStroke={true} // Boolean: Rounded/Flat line ends
            showPercentage={true} // Boolean: Show/hide percentage.
            showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
          />
        </div>
      </div>

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
        {isNotesOpen && <GuestNotes setIsNotesOpen={setIsNotesOpen} />}
        {isFlagOpen && (
          <FlagGuest
            setIsFlagOpen={setIsFlagOpen}
            setState={setState}
            guestId={guestId}
          />
        )}
        {/* <div className="guest-table"> */}
        {/* <MaterialTable
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
            title="Guests"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: PeopleIcon,
                tooltip: 'Family Members',
                onClick: (event, rowData) => {
                  // Do save operation
                  console.log(rowData);
                  history.push(`/family/${rowData.family_id}`);
                },
              },
              {
                icon: NoteIcon,
                tooltip: 'Notes',
                onClick: (event, rowData) => {
                  // Do save operation
                  setIsNotesOpen(true);
                },
              },
              {
                icon: FlagIcon,
                tooltip: 'Flag Guest',
                onClick: (event, rowData) => {
                  setIsFlagOpen(true);
                  setGuestId(rowData.id);
                },
              },
              {
                icon: InfoIcon,
                tooltip: 'More Info',
                onClick: (event, rowData) => {
                  setResult(state.data[rowData.id - 1]);
                  console.log(result);
                  toggleModal(event);
                  // Do save operation
                },
              },
            ]}
          /> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default ExecutiveDirectorDashboard;
