import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../api/axiosWithAuth';
import { Avatar, Descriptions, Card, Typography } from 'antd';
const { Text } = Typography;
const tabListNoTitle = [
  {
    key: 'General Info',
    tab: 'General Info',
  },
  {
    key: 'Benifits',
    tab: 'Benifits',
  },
  {
    key: 'Domestic Violence',
    tab: 'Domestic Violence',
  },
  {
    key: 'History',
    tab: 'History',
  },
];

const UserProfile = () => {
  const [familyInfo, setFamilyInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'General Info' });
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

  useEffect(() => {
    console.log(familyInfo);
  }, [familyInfo]);

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };

  const contentListNoTitle = {
    'General Info': (
      <div className="general_info">
        <Text type="secondary">Contact Information:</Text>
        <Descriptions>
          <Descriptions.Item label="name">
            {console.log(familyInfo.phone_one)}
          </Descriptions.Item>
          <Descriptions.Item label="number">{}</Descriptions.Item>
        </Descriptions>

        <Text type="secondary">Vehicle Information:</Text>
      </div>
    ),
    Benifits: <p>Benifits content</p>,
    History: <p>History content</p>,
    'Domestic Violence': (
      <div>
        <Text type="secondary">Contacted YWCA?</Text>
      </div>
    ),
  };
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
