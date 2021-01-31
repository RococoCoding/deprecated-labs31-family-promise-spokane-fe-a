import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import { tableIcons } from '../../../utils/tableIcons';
import PeopleIcon from '@material-ui/icons/People';
// import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
// import { CopyrightOutlined } from '@material-ui/icons';
import LoadingComponent from '../../common/LoadingComponent';
import Modal from 'react-modal';
import '../Guests/guest.css';
// import { CardContent, Card } from '@material-ui/core';
import GuestMoreInfo from '../Guests/GuestMoreInfo';
import { Checkbox } from '@material-ui/core';
import axios from 'axios';

const initialState = {
  data: [],
  layout: {},
  frames: [],
  config: {
    displaylog: false,
    displayModeBar: false,
  },
};

const Visuals = ({ days, current, family }) => {
  console.log('im days.layout', days.layout);
  const [enrolled, setEnrolled] = useState(days);
  const [age, setAge] = useState(current);
  const [members, setMembers] = useState(family);
  const [figure, setFigure] = useState(null);

  return (
    <>
      <div>
        <Plot
          className="DataViz"
          data={days.data}
          layout={days.layout}
          frames={days.frames}
          config={days.config}
          onInitialized={figure => setFigure(figure)}
          onUpdate={figure => setFigure(figure)}
        />
        <div>
          <Plot
            className="DataViz"
            data={age.data}
            layout={age.layout}
            frames={age.frames}
            config={age.config}
            onInitialized={figure => setFigure(figure)}
            onUpdate={figure => setFigure(figure)}
          />
        </div>
        <div>
          <Plot
            className="DataViz"
            data={members.data}
            layout={members.layout}
            frames={members.frames}
            config={members.config}
            onInitialized={figure => setFigure(figure)}
            onUpdate={figure => setFigure(figure)}
          />
        </div>
      </div>
    </>
  );
};

export default Visuals;
