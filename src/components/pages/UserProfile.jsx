import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import { Avatar, Descriptions, Card, Typography } from 'antd';
import LoadingComponent from '../common/LoadingComponent';

const { Text } = Typography;
const tabListNoTitle = [
  {
    key: 'Contact Info',
    tab: 'Contact Info',
  },
  {
    key: 'History',
    tab: 'History',
  },
  {
    key: 'Additional Info',
    tab: 'Additional Info',
  },
];

const UserProfile = () => {
  const [familyInfo, setFamilyInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'Contact Info' });
  const fetchFamilyInfo = async () => {
    try {
      const info = await axiosWithAuth()
        .get(`/families/1`)
        .then(res => res.data);
      setFamilyInfo(info);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyInfo();
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }
  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };
  let contentListNoTitle = {};
  if (familyInfo.phone_one != undefined && familyInfo.phone_one != {}) {
    contentListNoTitle = {
      'Contact Info': (
        <div className="contact_info">
          <Text type="secondary">Main Contact(s):</Text>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.phone_one.name}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.phone_one.number}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.phone_two.name}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.phone_two.number}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Text type="secondary">Alternative Contact:</Text>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.safe_alternitive.name}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.safe_alternitive.number}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Text type="secondary">Emergancy Contact:</Text>
          <Descriptions>
            <Descriptions.Item label="name">{}</Descriptions.Item>
            <Descriptions.Item label="number">{}</Descriptions.Item>
          </Descriptions>
        </div>
      ),
      History: (
        <div className="history">
          <Text type="secondary">Last permanent address:</Text>
          <p>{familyInfo.last_permanent_address}</p>
          <br></br>

          <Text type="secondary">Current location:</Text>
          <p>{familyInfo.last_permanent_address}</p>
          <Text type="secondary">Time at current location:</Text>
          <p>{familyInfo.last_permanent_address}</p>
          <br></br>

          <Text type="secondary">Prior location:</Text>
          <p>{familyInfo.last_permanent_address}</p>
          <Text type="secondary">Time at prior location:</Text>
          <p>{familyInfo.last_permanent_address}</p>
          <br></br>

          <Text>Times homeless in the last 3 years:</Text>
          <br></br>
          <Text>Total months homeless in the last 3 years:</Text>
        </div>
      ),
      'Additional Info': (
        <div className="additional_info">
          <Descriptions title="Insurance">
            <Descriptions.Item label="Insurance type">{}</Descriptions.Item>
            <Descriptions.Item label="Members covered">{}</Descriptions.Item>
            <Descriptions.Item label="Has pregnant member">
              {}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Goverment benifits">
            <Descriptions.Item label="RRH">{}</Descriptions.Item>
            <Descriptions.Item label="CPS/FPS">{}</Descriptions.Item>
            <Descriptions.Item label="Foodstamps">{}</Descriptions.Item>
            <Descriptions.Item label="Housing Voucher">{}</Descriptions.Item>
            <Descriptions.Item label="Snap">{}</Descriptions.Item>
            <Descriptions.Item label="Veteran Services">{}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Vehicle">
            <Descriptions.Item label="Make">{}</Descriptions.Item>
            <Descriptions.Item label="Model">{}</Descriptions.Item>
            <Descriptions.Item label="Year">{}</Descriptions.Item>
            <Descriptions.Item label="Color">{}</Descriptions.Item>
            <Descriptions.Item label="License plate">{}</Descriptions.Item>
          </Descriptions>
          <Descriptions title="Domestic violence">
            <Descriptions.Item label="Date of last Incident">
              {}
            </Descriptions.Item>
            <Descriptions.Item label="YWCA has been contacted">
              {}
            </Descriptions.Item>
            <Descriptions.Item label="Anonymity preferred">
              {}
            </Descriptions.Item>
            <Descriptions.Item label="Fleeing Domestic Violence">
              {}
            </Descriptions.Item>
            <Descriptions.Item label="Has court order of protection">
              {}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
    };
  }

  return (
    <div className="user-container">
      <div className="profile-header-container">
        <Avatar
          size={{ xs: 100, sm: 150, md: 200, lg: 200, xl: 200, xxl: 200 }}
          src={familyInfo.avatar_url}
        />
      </div>
      <Card
        style={{ width: '100%' }}
        tabList={tabListNoTitle}
        activeTabKey={tab.noTitleKey}
        onTabChange={key => {
          onTabChange(key, 'noTitleKey');
        }}
      >
        {contentListNoTitle[tab.noTitleKey]}
      </Card>
    </div>
  );
};

export default UserProfile;
