//
import React, { useState } from 'react';
import ShelterSchedule from './ShelterInfo/ShelterSchedule';
import NightShelter from './ShelterInfo/NightShelter';
import Welcome from './ShelterInfo/Welcome';
import Inside from './ShelterInfo/Inside';
import Outside from './ShelterInfo/Outside';
import Important from './ShelterInfo/Important';
import Resources from './ShelterInfo/Resources';
//Shelter info components(originally from Intake Form)
import { Card, Modal } from 'antd';

//Navigation path for Shelter info. Each name correspons with the switch statement id
const pages = [
  {
    id: <Welcome />,
    name: 'Welcome to Open Doors',
  },
  {
    id: <ShelterSchedule />,
    name: 'Shelter Schedule',
  },
  {
    id: <NightShelter />,
    name: 'Night Shelter Expectations & Safety',
  },
  {
    id: <Inside />,
    name: 'Inside the Shelter',
  },
  {
    id: <Outside />,
    name: 'Outside the Shelter',
  },
  {
    id: <Important />,
    name: 'Important Reminders',
  },
  {
    id: <Resources />,
    name: 'Important Resources & Phone Numbers',
  },
];

const ShelterInfo = () => {
  // const [info, setInfo] = useState(pages);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pageId, setPageId] = useState();

  const showModal = async pageId => {
    await setPageId(pageId);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //Inline styling for form container
  const tempFormStyle = {
    marginLeft: '20%',
    marginTop: '50px',
    maxWidth: '900px',
  };

  const gridStyle = {
    width: '33%',
    textAlign: 'center',
  };

  return (
    <div style={tempFormStyle}>
      <Card title="Shelter Information & Additional Resources">
        {pages.map((page, index) => (
          <Card.Grid
            key={page.id}
            style={gridStyle}
            onClick={() => {
              showModal(page.id);
            }}
          >
            {page.name}
          </Card.Grid>
        ))}
      </Card>
      <Modal
        width={1000}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {pageId}
      </Modal>
    </div>
  ); //ends return
}; //ends function

export default ShelterInfo;
