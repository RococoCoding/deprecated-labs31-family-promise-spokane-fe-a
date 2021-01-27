// import React, { useEffect, useState } from 'react';
// import Plot from 'react-plotly.js';
// import MaterialTable from 'material-table';
// import { axiosWithAuth } from '../../../api/axiosWithAuth';
// import { useHistory } from 'react-router-dom';
// import { tableIcons } from '../../../utils/tableIcons';
// import PeopleIcon from '@material-ui/icons/People';
// // import CardShadow from '../../CardShadow';
// import FlagGuest from '../../modals/FlagGuest';
// import GuestNotes from '../../modals/GuestNotes';
// // import { CopyrightOutlined } from '@material-ui/icons';
// import LoadingComponent from '../../common/LoadingComponent';
// import Modal from 'react-modal';
// import '../Guests/guest.css';
// // import { CardContent, Card } from '@material-ui/core';
// import GuestMoreInfo from '../Guests/GuestMoreInfo';
// import { Checkbox } from '@material-ui/core';
// import axios from 'axios';

// const initialState = {
//   data: [],
//   layout: {},
//   frames: [],
//   config: {
//     displaylog: false,
//     displayModeBar: false,
//   ,;
// };

// const Visuals = ({ visuals }) => {
//   const [data, setData] = useState(initialState);
//   const [figure, setFigure] = useState(null);

//   return (
//     <>
//       <div className="guest-table-container">
//         {Object.keys(state).map(data => {
//           console.log(data);
//         })}
//         <div className="guest-table">
//           this is where we will plug in the visualizations that we pull from the
//           DS API that was passed down from the other component.
//         </div>
//       </div>
//     </>
//   );
// };

// export default Visuals;
