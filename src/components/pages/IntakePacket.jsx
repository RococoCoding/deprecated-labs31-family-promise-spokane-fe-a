import React, { useState } from 'react';
import { useForm, useStep } from 'react-hooks-helper';

import ContactInfo from './IntakePacketContent/ByGuests/ContactInfo';
import FamilyMembers from './IntakePacketContent/ByGuests/FamilyMembers';
import RaceEthnicityInfo from './IntakePacketContent/ByGuests/RaceEthnicityInfo';
import BarriersPage from './IntakePacketContent/ByGuests/BarriersPage';
import ChildSchoolInfo from './IntakePacketContent/ByGuests/ChildSchoolInfo';
import DomesticViolence from './IntakePacketContent/ByGuests/DomesticViolence';
import HomelessHistory from './IntakePacketContent/ByGuests/HomelessHistory';
import Insurance from './IntakePacketContent/ByGuests/Insurance';
import FamilyDemographics from './IntakePacketContent/ByGuests/FamilyDemographics';
import AdditionalInfo from './IntakePacketContent/ByGuests/AdditionalInfo';
import IntakeStart from './IntakePacketContent/IntakeStart';
import CreateOktaAccountForm from './IntakePacketContent/createOktaAccountForm/CreateOktaAccountForm';

const steps = [
  { id: 'IntakeStart' },
  { id: 'ContactInfo' },
  { id: 'FamilyMembers' },
  { id: 'FamilyDemographics' },
  { id: 'RaceEthnicityInfo' },
  { id: 'BarriersPage' },
  { id: 'ChildSchoolInfo' },
  { id: 'DomesticViolence' },
  { id: 'HomelessHistory' },
  { id: 'Insurance' },
  { id: 'AdditionalInfo' },
];

let defaultData = {
  familyInfo: {
    user_id: null,
    case_number: null,
    phone_one: {
      name: null,
      number: null,
      safeToLeaveMssg: null,
    },
    phone_two: {
      name: null,
      number: null,
      safeToLeaveMssg: null,
    },
    emergencyContact: {
      name: null,
      number: null,
    },
    vehicle: {
      make: null,
      year: null,
      color: null,
      model: null,
      license_plate: null,
    },
    last_permanent_address: null,
    homeless_info: {
      prior_location: null,
      current_location: null,
      num_times_homeless: null,
      total_len_homeless: null,
      homeless_start_date: null,
      length_at_prior_location: null,
      length_at_current_location: null,
    },
    gov_benefits: {
      RRH: null,
      snap: null,
      cps_fps: null,
      foodstamps: null,
      housing_voucher: null,
      veteran_services: null,
    },
    insurance: {
      pregnancies: {
        is_pregnant: null,
        if_yes_who: null,
        due_date: null,
      },
      has_insurance: null,
      members_covered: null,
      health_insurance_type: null,
    },
    domestic_violence_info: {
      fleeing_dv: null,
      YWCA_contacted: null,
      has_court_order: null,
      date_last_incident: null,
      anonymity_preferred: null,
    },
    avatar_url: null,
    pets: 0,
    percent_complete: 0,
  },
  familyMember: {},
};

const IntakePacket = () => {
  const [count, setCount] = useState(0);
  const nameString = (n, location) => `familyMember.${n}.${location}`;

  const tempFormStyle = {
    marginLeft: '20%',
    marginTop: '50px',
    maxWidth: '900px',
  };

  const [userId, setUserId] = useState(null);
  const [formData, setForm] = useForm(defaultData);
  const { step, navigation } = useStep({ initialStep: 0, steps });

  const { id } = step;
  const props = {
    navigation,
    formData,
    setForm,
    tempFormStyle,
    count,
    setCount,
    nameString,
    userId,
  };

  // if (!userId) {
  //   return <CreateOktaAccountForm setUserId={setUserId} />;
  // }
  formData.familyInfo.user_id = userId;

  switch (id) {
    case 'IntakeStart':
      return <IntakeStart {...props} />;
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
    case 'AdditionalInfo':
      return <AdditionalInfo {...props} />;
    default:
      return null;
  }
};

export default IntakePacket;
