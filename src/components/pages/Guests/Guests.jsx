import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import NoteIcon from '@material-ui/icons/Note';
import PeopleIcon from '@material-ui/icons/People';
import InfoIcon from '@material-ui/icons/Info';
import { tableIcons } from '../../../utils/tableIcons';
import FlagIcon from '@material-ui/icons/Flag';
import CardShadow from '../../CardShadow';
import FlagGuest from '../../modals/FlagGuest';
import GuestNotes from '../../modals/GuestNotes';
import { CopyrightOutlined } from '@material-ui/icons';
import LoadingComponent from '../../common/LoadingComponent';

const Guests = () => {
  const [loading, setLoading] = useState(true);

  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'Relationship', field: 'relationship' },
    ],
    data: [],
  });

  useEffect(() => {
    axiosWithAuth()
      .get('/members')
      .then(res => {
        let copy = { ...state };

        let formattedData = res.data.map(member => {
          return {
            ...member.demographics,
            ...member.bearers,
            ...member.schools,
            flag_level: 0,
            ...member,
          };
        });

        copy.data.push(...formattedData);

        setState(copy);
      })
      .catch(err => {
        alert('error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const [isFlagOpen, setIsFlagOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [guestId, setGuestId] = useState(null);

  const history = useHistory();

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="guest-table-container">
      {isNotesOpen && <GuestNotes setIsNotesOpen={setIsNotesOpen} />}
      {isFlagOpen && (
        <FlagGuest
          setIsFlagOpen={setIsFlagOpen}
          setState={setState}
          guestId={guestId}
        />
      )}
      <div className="guest-table">
        <MaterialTable
          options={{
            exportButton: true,
            rowStyle: rowData => ({
              backgroundColor:
                rowData.flag_level == 2
                  ? 'rgba(255, 255, 0, 0.419)'
                  : rowData.flag_level == 3
                  ? 'rgba(255, 0, 0, 0.418)'
                  : 'white',
            }),
          }}
          icons={tableIcons}
          title="Guests"
          columns={state.columns}
          data={state.data}
          actions={[
            {
              icon: PeopleIcon,
              tooltip: 'Family Members',
              onClick: (event, rowData) => {
                // Do save operation
                console.log(rowData);
                history.push(`/family/${rowData.family_id}`);
              },
            },
            {
              icon: NoteIcon,
              tooltip: 'Notes',
              onClick: (event, rowData) => {
                // Do save operation
                setIsNotesOpen(true);
              },
            },
            {
              icon: FlagIcon,
              tooltip: 'Flag Guest',
              onClick: (event, rowData) => {
                setIsFlagOpen(true);
                setGuestId(rowData.id);
              },
            },
            {
              icon: InfoIcon,
              tooltip: 'More Info',
              onClick: (event, rowData) => {
                // Do save operation
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Guests;
