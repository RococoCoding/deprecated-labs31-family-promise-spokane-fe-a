import React from 'react';
import './execDirectorAnalytics.css';
import Chart from './Chart';

const execDirectorAnalytics = () => {
  return (
    <main>
      <div className="main__container">
        {/* <!-- MAIN TITLE STARTS HERE --> */}

        <div className="main__title">
          <div className="main__greeting">
            <h1>Hello, Executive Director</h1>
          </div>
        </div>

        {/* <!-- MAIN TITLE ENDS HERE --> */}

        {/* <!-- MAIN CARDS STARTS HERE --> */}
        <div className="main__cards">
          <div className="card">
            <i
              className="fa fa-hashtag fa-2x text-lightblue"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Beds Available</p>
              <span className="font-bold text-title">?</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-user-o fa-2x text-red" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Guests Checked In</p>
              <span className="font-bold text-title">?</span>
            </div>
          </div>

          <div className="card">
            <i
              className="fa fa-hashtag fa-2x text-yellow"
              aria-hidden="true"
            ></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Beds Reserved</p>
              <span className="font-bold text-title">?</span>
            </div>
          </div>

          <div className="card">
            <i className="fa fa-user-o text-green" aria-hidden="true"></i>
            <div className="card_inner">
              <p className="text-primary-p">Number of Children</p>
              <span className="font-bold text-title">?</span>
            </div>
          </div>
        </div>
        {/* <!-- MAIN CARDS ENDS HERE --> */}

        {/* <!-- CHARTS STARTS HERE --> */}
        <div className="chart">
          <div className="chart__left">
            <div className="chart__left__title">
              <div>
                <h1>Daily Reports</h1>
                <p>Spokane, WA</p>
              </div>
              <i className="fa fa-chart" aria-hidden="true"></i>
            </div>
            <div className="DataViz"></div>
          </div>

          <div className="chart__right">
            <div className="chart__right__title">
              <div>
                <h1>Stats Reports</h1>
                <p>Spokane, WA</p>
              </div>
              <i className="fa fa-chart" aria-hidden="true"></i>
            </div>

            <div className="chart__right__cards">
              <div className="card1">
                <h1>Something</h1>
                <p>Something</p>
              </div>

              <div className="card2">
                <h1>Something</h1>
                <p>Something</p>
              </div>

              <div className="card3">
                <h1>Something</h1>
                <p>Something</p>
              </div>

              <div className="card4">
                <h1>Something</h1>
                <p>Something</p>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default execDirectorAnalytics;
