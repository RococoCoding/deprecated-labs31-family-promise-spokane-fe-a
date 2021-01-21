/*
Signatures for Client Release form from Guests
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import {
  Form,
  Input,
  Button,
  Space,
  Card,
  Progress,
  Select,
  DatePicker,
} from 'antd';

const ClientReleaseSignature = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  count,
  setCount,
  nameString,
  steps,
  step,
}) => {
  // //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  // //FamilyMember Data Structure from ../../intakePacket.jsx (props)
  const { familyMember } = formData;

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Client Release Guest Signature" bordered={false}>
        <IntakeButton navigation={navigation} />
        <Form>
          <Form.Item>
            <Input className="initials" />I consent to the inclusion of personal
            information in CMIS about me and any dependents listed below and
            authorize information collected to be shared with other local
            service agencies. I understand that my personal information will not
            be made public and will only be used with strict confidentiality. I
            also understand that I may withdraw my consent at any time.
          </Form.Item>

          <Form.Item>
            <Input className="initials" />I do not consent to the inclusion of
            personal information about me or any of my dependents.
          </Form.Item>

          {/* Adding Dependents  */}

          <Form.Item>
            Dependent children under 18 in household, if any (please{' '}
            <strong>add first and last</strong> names):
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
            <Input />
          </Form.Item>
          <Form.Item>
            <Input bordered={false} />
            <hr />
            CLIENT SIGNATURE(adult)
            <DatePicker />
            <Input bordered={false} />
            <hr />
            CLIENT SIGNATURE(adult)
            <DatePicker />
            <p>*** Please return device to staff member. ***</p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ClientReleaseSignature;
