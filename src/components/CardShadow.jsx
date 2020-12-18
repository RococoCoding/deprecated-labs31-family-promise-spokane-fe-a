import React from 'react';
import styled from 'styled-components';

const CardShadow = styled('div')`
  width: 100%;
  min-height: 100vh;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 11;
`;

export default CardShadow;
