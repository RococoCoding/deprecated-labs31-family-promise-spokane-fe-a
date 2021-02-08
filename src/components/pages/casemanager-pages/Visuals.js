import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import '../Guests/guest.css';

const Visuals = ({ days, current, family }) => {
  console.log('im days.layout', days.layout);
  // const [enrolled, setEnrolled] = useState(days);
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

        <Plot
          className="DataViz"
          data={age.data}
          layout={age.layout}
          frames={age.frames}
          config={age.config}
          onInitialized={figure => setFigure(figure)}
          onUpdate={figure => setFigure(figure)}
        />

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
    </>
  );
};

export default Visuals;
