import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import LoadingComponent from '../../common/LoadingComponent';
import { useParams } from 'react-router-dom';
import MaterialTable from 'material-table';
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

const FamilyMembers = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    columns: [
      { title: 'First', field: 'first_name', type: 'hidden' },
      { title: 'Last ', field: 'last_name' },
      { title: 'DOB', field: 'DOB', type: 'date' },
      { title: 'relationship', field: 'relationship' },
    ],
    data: [],
  });

  const fetchFamilyMembers = async () => {
    try {
      const data = await axiosWithAuth()
        .get(`/families/${params.id}/members`)
        .then(res => res.data);
      const formattedData = data.map(member => {
        return { ...member.demographics };
      });
      let copy = { ...state };
      copy.data.push(...formattedData);
      console.log(copy);
      setState(copy);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="guest-table-container">
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
          title="Members"
          columns={state.columns}
          data={state.data}
          actions={
            [
              // {
              //     icon: NoteIcon,
              //     tooltip: 'Notes',
              //     onClick: (event, rowData) => {
              //         // Do save operation
              //         setIsNotesOpen(true)
              //     },
              // },
              // {
              //     icon: FlagIcon,
              //     tooltip: 'Flag Guest',
              //     onClick: (event, rowData) => {
              //         setIsFlagOpen(true)
              //         setGuestId(rowData.id)
              //     },
              // },
              // {
              //     icon: InfoIcon,
              //     tooltip: 'More Info',
              //     onClick: (event, rowData) => {
              //         // Do save operation
              //     },
              // },
            ]
          }
        />
      </div>
    </div>
  );
};

export default FamilyMembers;
