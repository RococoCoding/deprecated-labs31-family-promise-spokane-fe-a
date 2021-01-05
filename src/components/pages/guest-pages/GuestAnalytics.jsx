import React, { useEffect, useState } from 'react';

// ant design
import { Progress } from 'antd';

//redux
import { connect } from 'react-redux';
import actions from '../../../state/actions/families';

// utils
import { returnPercentComplete } from '../../../utils/percentComplete';

const GuestAnalytics = ({ household, fetchHousehold, fetchFamily }) => {
  const [percentComplete, setPercentComplete] = useState(0);
  const [loading, setLoading] = useState(false);

  const getPercentComplete = () => {
    // fetch household data object
    fetchHousehold();

    // calculates a percentage of complete values
    const percent = returnPercentComplete(household);

    setPercentComplete(percent[0]);
  };

  useEffect(() => {
    fetchFamily();
    fetchHousehold();
  }, []);

  return (
    <div className="dashboard-container">
      <h1> Guest Analytics</h1>
      <p>
        You have completed {percentComplete}% of your household's intake form!
        Click the link below to complete or update your information.{' '}
      </p>
      <div className="progress-section">
        <Progress type="circle" percent={percentComplete} />
        <p> Doen't look correct? </p>
        <button onClick={getPercentComplete}>Refresh </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { household: state.HOUSEHOLD, loading: state.LOADING };
}

const mapDispatchToProps = {
  fetchHousehold: actions.fetchHousehold,
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(GuestAnalytics);
