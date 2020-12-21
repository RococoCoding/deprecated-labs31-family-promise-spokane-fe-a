import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingComponent from '../../common/LoadingComponent';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { Card } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';

const Notes = () => {
  const params = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const fetchNotes = async family_id => {
    setLoading(true);
    try {
      let notesData = await axiosWithAuth()
        .get(`/families/${params.family_id}/notes`)
        .then(res => res.data);
      setNotes(notesData);
    } catch (error) {
      alert('Error');
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="notes-page-container">
      <ArrowLeftOutlined
        style={{ fontSize: '30px' }}
        className="notes-page-back"
        onClick={() => history.goBack()}
      />

      {notes.map(note => {
        return (
          <Card
            extra={<Link to={`/families/${params.family_id}`}>More</Link>}
            actions={[
              <p style={{ textAlign: 'left', paddingLeft: '25px' }}>
                Comments
              </p>,
            ]}
            style={{ width: '60%' }}
            title={note.subject}
          >
            {note.content.slice(0, 100) + '...'}
          </Card>
        );
      })}
    </div>
  );
};

export default Notes;
