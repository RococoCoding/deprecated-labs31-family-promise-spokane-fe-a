import React from 'react';

// ant design
import { Progress } from 'antd';

const GuestAnalytics = () => {
  return (
    <div className="dashboard-container">
      <h1> Guest Analytics</h1>
      <div className="progress-section">
        <p>
          You have completed 50% of your household's intake form! Click the link
          below to complete or update your information.{' '}
        </p>
        <>
          <Progress type="circle" percent={75} />

          <Progress type="circle" percent={70} status="exception" />
          <Progress type="circle" percent={100} />
        </>
      </div>
    </div>
  );
};

export default GuestAnalytics;
