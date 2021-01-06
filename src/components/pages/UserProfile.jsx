import { Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { Avatar, Descriptions, Card, Typography } from 'antd';
import user from '../../assets/user.svg';
//redux
import { connect } from 'react-redux';
import actions from '../../state/actions/families';

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

const UserProfile = ({ familyInfo, fetchFamily }) => {
  useEffect(() => {
    fetchFamily();
  }, []);
  console.log(familyInfo);
  const [tab, setTab] = useState({ key: 'tab1', noTitleKey: 'Contact Info' });

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
              {familyInfo.phone_one.name ? familyInfo.phone_one.name : ''}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.phone_one.number ? familyInfo.phone_one.number : ''}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.phone_two.name ? familyInfo.phone_two.name : ''}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.phone_two.number ? familyInfo.phone_two.number : ''}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Text type="secondary">Alternative Contact:</Text>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.safe_alternate.name
                ? familyInfo.safe_alternate.name
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.safe_alternate.number
                ? familyInfo.safe_alternate.number
                : ''}
            </Descriptions.Item>
          </Descriptions>
          <br></br>
          <Text type="secondary">Emergancy Contact:</Text>
          <Descriptions>
            <Descriptions.Item label="name">
              {familyInfo.emergencyContact.name
                ? familyInfo.emergencyContact.name
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="number">
              {familyInfo.emergencyContact.number
                ? familyInfo.emergencyContact.number
                : ''}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ),
      History: (
        <div className="history">
          <Text type="secondary">Last permanent address:</Text>
          <p>
            {familyInfo.last_permanent_address
              ? familyInfo.last_permanent_address
              : ''}
          </p>
          <br></br>

          <Text type="secondary">Current location:</Text>
          <p>
            {familyInfo.homeless_info.current_location
              ? familyInfo.homeless_info.current_location
              : ''}
          </p>
          <Text type="secondary">Time at current location:</Text>
          <p>
            {familyInfo.homeless_info.length_at_current_location
              ? familyInfo.homeless_info.length_at_current_location
              : ''}
          </p>
          <br></br>

          <Text type="secondary">Prior location:</Text>
          <p>
            {familyInfo.homeless_info.prior_location
              ? familyInfo.homeless_info.prior_location
              : ''}
          </p>
          <Text type="secondary">Time at prior location:</Text>
          <p>
            {familyInfo.homeless_info.length_at_prior_location
              ? familyInfo.homeless_info.length_at_prior_location
              : ''}
          </p>
          <br></br>

          <Text>
            Times homeless in the last three years:{' '}
            {familyInfo.homeless_info.num_times_homeless
              ? familyInfo.homeless_info.num_times_homeless
              : ''}
          </Text>
          <br></br>
          <Text>
            Total months homeless in the last three years:{' '}
            {familyInfo.homeless_info.total_len_homeless
              ? familyInfo.homeless_info.total_len_homeless
              : ''}
          </Text>
        </div>
      ),
      'Additional Info': (
        <div className="additional_info">
          <Descriptions title="Insurance">
            <Descriptions.Item label="Insurance type">
              {familyInfo.insurance.health_insurance_type
                ? familyInfo.insurance.health_insurance_type
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Members covered">
              {familyInfo.insurance.members_covered
                ? familyInfo.insurance.members_covered
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Has pregnant member">
              {familyInfo.insurance.pregnancies
                ? familyInfo.insurance.pregnancies == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Goverment benifits">
            <Descriptions.Item label="RRH">
              {familyInfo.gov_benefits.RRH
                ? familyInfo.gov_benefits.RRH == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="CPS/FPS">
              {familyInfo.gov_benefits.cps_fps
                ? familyInfo.gov_benefits.cps_fps == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Foodstamps">
              {familyInfo.gov_benefits.foodstamps
                ? familyInfo.gov_benefits.foodstamps == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Housing Voucher">
              {familyInfo.gov_benefits.housing_voucher
                ? familyInfo.gov_benefits.housing_voucher == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Snap">
              {familyInfo.gov_benefits.snap
                ? familyInfo.gov_benefits.snap == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Veteran Services">
              {familyInfo.gov_benefits.veteran_servcies
                ? familyInfo.gov_benefits.veteran_servcies == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Vehicle">
            <Descriptions.Item label="Make">
              {familyInfo.vehicle.make ? familyInfo.vehicle.make : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Model">
              {familyInfo.vehicle.model ? familyInfo.vehicle.model : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Year">
              {familyInfo.vehicle.year ? familyInfo.vehicle.year : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Color">
              {familyInfo.vehicle.color ? familyInfo.vehicle.color : ''}
            </Descriptions.Item>
            <Descriptions.Item label="License plate">
              {familyInfo.vehicle.license_plate
                ? familyInfo.vehicle.license_plate
                : ''}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions title="Domestic violence">
            <Descriptions.Item label="Date of last Incident">
              {familyInfo.domestic_violence_info.date_last_incident
                ? familyInfo.domestic_violence_info.date_last_incident
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="YWCA has been contacted">
              {familyInfo.domestic_violence_info.YWCA_contacted
                ? familyInfo.domestic_violence_info.YWCA_contacted == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Anonymity preferred">
              {familyInfo.domestic_violence_info.anonymity_preferred
                ? familyInfo.domestic_violence_info.anonymity_preferred == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Fleeing Domestic Violence">
              {familyInfo.domestic_violence_info.fleeing_dv
                ? familyInfo.domestic_violence_info.fleeing_dv == true
                  ? 'yes'
                  : 'no'
                : ''}
            </Descriptions.Item>
            <Descriptions.Item label="Has court order of protection">
              {familyInfo.domestic_violence_info.has_court_order
                ? familyInfo.domestic_violence_info.has_court_order == true
                  ? 'yes'
                  : 'no'
                : ''}
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
function mapStateToProps(state) {
  return { familyInfo: state.FAMILY };
}
const mapDispatchToProps = {
  fetchFamily: actions.fetchFamily,
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
