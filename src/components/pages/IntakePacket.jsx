import React from 'react';
import { useForm, useStep } from 'react-hooks-helper';

import IdVerification from './IntakePacketContent/BySupervisor/IdVerification';
import ContactInfo from './IntakePacketContent/ByGuests/ContactInfo';
import FamilyMembers from './IntakePacketContent/ByGuests/FamilyMembers';
import RaceEthnicityInfo from './IntakePacketContent/ByGuests/RaceEthnicityInfo';
import BarriersPage from './IntakePacketContent/ByGuests/BarriersPage';
import ChildSchoolInfo from './IntakePacketContent/ByGuests/ChildSchoolInfo';
import DomesticViolence from './IntakePacketContent/ByGuests/DomesticViolence';
import HomelessHistory from './IntakePacketContent/ByGuests/HomelessHistory';
import Insurance from './IntakePacketContent/ByGuests/Insurance';
import FamilyDemographics from './IntakePacketContent/ByGuests/FamilyDemographics';
import CreateOktaAccountForm from './IntakePacketContent/createOktaAccountForm/CreateOktaAccountForm';
import { useState } from 'react';

const steps = [
  { id: 'ContactInfo' },
  { id: 'FamilyMembers' },
  { id: 'FamilyDemographics' },
  { id: 'RaceEthnicityInfo' },
  { id: 'BarriersPage' },
  { id: 'ChildSchoolInfo' },
  { id: 'DomesticViolence' },
  { id: 'HomelessHistory' },
  { id: 'Insurance' },
];

const defaultData = {
  familyInfo: {
    user_id: 1,
    case_number: 25,
    phone_one: {
      name: '',
      number: '',
      safeToLeaveMssg: false,
    },
    phone_two: {
      name: '',
      number: '',
      safeToLeaveMssg: false,
    },
    emergencyContact: {
      name: '',
      number: '',
    },
    vehicle: {
      make: '',
      year: '',
      color: '',
      model: '',
      license_plate: '',
    },
    last_permanent_address: '',
    homeless_info: {
      prior_location: '',
      current_location: '',
      num_times_homeless: 0,
      total_len_homeless: 0,
      homeless_start_date: '',
      length_at_prior_location: '',
      length_at_current_location: '',
    },
    gov_benefits: {
      RRH: false,
      snap: false,
      'cps/fps': false,
      foodstamps: false,
      housing_voucher: false,
      veteran_services: false,
    },
    insurance: {
      pregnancies: false,
      has_insurance: false,
      members_covered: 0,
      health_insurance_type: '',
    },
    domestic_violence_info: {
      fleeing_dv: false,
      YWCA_contacted: false,
      has_court_order: false,
      date_last_incident: false,
      anonymity_preferred: false,
    },
    avatar_url:
      'https://microlancer.lancerassets.com/v2/services/91/166a65bdfc45e5ade4cee71859b871/large_avatar.jpg',
  },
  familyMember: [],
};

const IntakePacket = () => {
  const tempFormStyle = {
    marginLeft: '20%',
    marginTop: '50px',
    maxWidth: '900px',
  };

  const [userId, setUserId] = useState(null);
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;
  const props = { navigation, formData, setForm, tempFormStyle };

  if (!userId) {
    return <CreateOktaAccountForm setUserId={setUserId} />;
  }

  switch (id) {
    case 'ContactInfo':
      return <ContactInfo {...props} />;
    case 'FamilyMembers':
      return <FamilyMembers {...props} />;
    case 'FamilyDemographics':
      return <FamilyDemographics {...props} />;
    case 'RaceEthnicityInfo':
      return <RaceEthnicityInfo {...props} />;
    case 'BarriersPage':
      return <BarriersPage {...props} />;
    case 'ChildSchoolInfo':
      return <ChildSchoolInfo {...props} />;
    case 'DomesticViolence':
      return <DomesticViolence {...props} />;
    case 'HomelessHistory':
      return <HomelessHistory {...props} />;
    case 'Insurance':
      return <Insurance {...props} />;
    default:
      return null;
  }
};

export default IntakePacket;
