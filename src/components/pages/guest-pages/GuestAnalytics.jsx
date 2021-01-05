import React, { useEffect, useState } from 'react';

// ant design
import { Progress } from 'antd';

//redux
import { connect } from 'react-redux';
import actions from '../../../state/actions/families';

// utils
import returnPercentComplete from '../../../utils/percentComplete';

const GuestAnalytics = ({ HOUSEHOLD, fetchHousehold, fetchFamily }) => {
  console.log('**********************', HOUSEHOLD);

  // const [percentComplete, setPercentComplete] = useState(0);
  // console.log('percent comp*************', returnPercentComplete(HOUSEHOLD));
  // // const getPercentComplete = HOUSEHOLD => {
  // //   return percent;
  // // };

  useEffect(() => {
    fetchFamily();
    fetchHousehold();
  }, []);

  return (
    <div className="dashboard-container">
      <h1> Guest Analytics</h1>
      <div className="progress-section">
        <p>
          You have completed 50% of your household's intake form! Click the link
          below to complete or update your information.{' '}
        </p>
        <>
          <Progress type="circle" percent={'100'} />
        </>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  const { HOUSEHOLD } = state.HOUSEHOLD;
  return { HOUSEHOLD };
};
const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestAnalytics);
