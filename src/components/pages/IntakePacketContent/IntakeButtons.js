import React from 'react';
import PropTypes from 'prop-types';

const IntakeButton = props => {
  return (
    <button
      disabled={props.isDisabled}
      className={props.classType || 'primary'}
    >
      {props.buttonText}
    </button>
  );
};

export default IntakeButton;
