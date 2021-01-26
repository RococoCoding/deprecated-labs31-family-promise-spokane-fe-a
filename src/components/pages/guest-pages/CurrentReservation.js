import React from 'react';

const CurrentReservation = () => {
  return (
    <div className="container">
      <h3>Your Current Reservation</h3>

      <p>
        You currently have XX number of beds reserved
        <span>
          If you would like to cancel, please click the cancel button below
        </span>
      </p>
      {/* Button should cancel reservation(change guest reservation from true to false) and restore number of beds open */}
      <button>Cancel Reservation</button>
    </div>
  );
};

export default CurrentReservation;
