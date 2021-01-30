import React from 'react';

const CurrentReservation = ({ membersStaying, cancelButton }) => {
  return (
    <div className="container">
      <h3>Your Current Reservation</h3>

      <p>
        You currently have {membersStaying.length} beds reserved. If you would
        like to cancel, please click the cancel button below
      </p>
      <button onClick={cancelButton}>Cancel Reservation</button>
    </div>
  );
};

export default CurrentReservation;
