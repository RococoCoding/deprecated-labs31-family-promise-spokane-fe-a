import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Circle from 'react-circle';

import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';
import Modal from 'react-modal';
import './execDirector.scss';
import Plot from 'react-plotly.js';
import mockData from './mock-data.json';
Modal.setAppElement('#root');

const ExecutiveDirectorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', col_type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', col_type: 'date' },
      { title: 'Relationship', field: 'relationship' },
    ],
    data: [],
  });

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

  // Labs32 - May want to consider refactoring some of the following code into separate components

  // GET exit breakdown
  const [exitBreakdownFeature, setExitBreakdownFeature] = useState('DEST');
  const [m, setM] = useState(90);
  const [exitBreakdownPlot, setExitBreakdownPlot] = useState(mockData.data);

  function onExitSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://fam-prom-the-end.eba-jknbh7ge.us-east-1.elasticbeanstalk.com/pie-${exitBreakdownFeature}/${m}`
      )
      .then(res => {
        console.log(res.data);
        setExitBreakdownPlot(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // GET moving average
  const [movingAvgPlot, setMovingAvgPlot] = useState(mockData.data);
  const [movingAvg, setMovingAvg] = useState(90);
  const [movingAvgFeature, setMovingAvgFeature] = useState('DEST');
  const [daysBack, setDaysBack] = useState(30);

  function onMovingSubmit(e) {
    e.preventDefault();
    axios
      .get(
        `http://fam-prom-the-end.eba-jknbh7ge.us-east-1.elasticbeanstalk.com/moving-avg-${movingAvgFeature}/${movingAvg}-${daysBack}`
      )
      .then(res => {
        console.log(res.data);
        setMovingAvgPlot(res.data.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  if (loading) {
    return (
      <div className="data-viz-container">
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

        <div className="exit-breakdown">
          <form onSubmit={onExitSubmit}>
            <h2>Exit Breakdown</h2>
            <label>Select 90 or 365 day moving average: </label>
            <select
              value={parseInt(m, 10)}
              onChange={e => {
                setM(e.target.value);
              }}
            >
              <option value="90">90</option>
              <option value="365">365</option>
            </select>
            <br></br>
            <label>Select DEST, INC, or LEN: </label>
            <select
              value={exitBreakdownFeature}
              onChange={e => {
                setExitBreakdownFeature(e.target.value);
              }}
            >
              <option value="DEST">Destination</option>
              <option value="INC">Income</option>
              <option value="LEN">Length of stay</option>
            </select>{' '}
            <br></br>
            <button type="submit">Submit</button>
          </form>
          <Plot className="ExitBreakdown" data={exitBreakdownPlot} />
        </div>

        <div className="moving-average">
          <form onSubmit={onMovingSubmit}>
            <h2>Moving Average</h2>
            <label>Select 90 day or 365 day moving average: </label>
            <select
              value={parseInt(movingAvg, 10)}
              onChange={e => {
                setMovingAvg(e.target.value);
              }}
            >
              <option value="90">90</option>
              <option value="365">365</option>
            </select>
            <br></br>
            <label>Select DEST, INC, or LEN: </label>
            <select
              value={movingAvgFeature}
              onChange={e => {
                setMovingAvgFeature(e.target.value);
              }}
            >
              <option value="DEST">Destination</option>
              <option value="INC">Income</option>
              <option value="LEN">Length of stay</option>
            </select>
            <br></br>
            <label>Enter the amount of days back you would like to see: </label>
            <input
              type="number"
              placeholder="days back"
              value={daysBack}
              onChange={e => setDaysBack(e.target.value)}
            />{' '}
            <br></br>
            <button type="submit">Submit</button>
          </form>
          <Plot className="MovingAverage" data={movingAvgPlot} />
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
    </>
  );
};

export default ExecutiveDirectorDashboard;
