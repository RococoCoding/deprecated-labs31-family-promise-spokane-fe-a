/*
Signatures for Client Release form from Guests
*/

import React from 'react';

//Previous/Next buttons
import IntakeButton from '../../IntakeButtons';

//Ant Design imports (https://ant.design/components/overview/)
import { Form, Input, Card, Progress } from 'antd';

const SuspensionAgreement = ({
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
  // const { familyMember } = formData;

  return (
    <div style={tempFormStyle}>
      Progress bar
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Suspension Agreement" bordered={false}>
        <IntakeButton navigation={navigation} />
        <Form.Item>
          <strong>
            In order to create a safe and comfortable environment for children,
            families, staff and volunteers, Open Doors holds the following
            expectations of every person using the shelter: I
          </strong>
          <Input /> <strong>understand that If I:</strong>
          <p>
            ● Spank, hit, or aggressively handle my child. i.e. throw, push or
            pull my child etc,
          </p>
          <p>
            ● Yell at my child, other children or another adult in a threatening
            or aggressive manner,
          </p>
          <p>
            ● Use profanity (cursing) directed at my child, other children,
            guest, staff, volunteer, or intern,
          </p>
          <p>
            ● Conduct myself in a manner that creates an environment that
            infringes on the safety, well-being or peace of mind of any guest,
            staff member or volunteer
          </p>
          <p>
            <strong>
              I will be asked to leave Open Doors property until 7:00 pm
              check-in the following night, or until I have met with the Program
              Manager (depending on severity). If a staff member or volunteer
              feels that there is ANY question of abuse or neglect of your child
              they will error on the side of caution and make a report to CPS.
            </strong>
          </p>
          <p>
            <strong>Further, I understand</strong>
          </p>
          <p>● This might result in losing my spot at the night shelter</p>
          <p>● I may not have another family or staff member sign me in</p>
          <p>● It is not my responsibility to tell on other guests</p>
          <p>● Hear-say information will not be given credibility</p>
          <p>● All incidents must be witnessed by supervisor on shift</p>
          <p>● All incidents will be evaluated by supervisor on shift</p>
          <p>
            ● I will not be suspended as a result of my child breaking these
            guidelines
          </p>
          <Form.Item>
            <Input bordered={false} />
            <hr />
            Name:
            <Input bordered={false} />
            <hr />
            Signature:
            <Input bordered={false} />
            <hr />
            Date:
          </Form.Item>
          <Form.Item>
            <Input bordered={false} />
            <hr />
            Name:
            <Input bordered={false} />
            <hr />
            Signature:
            {/* <DatePicker /> */}
            <Input bordered={false} />
            <hr />
            Date:
          </Form.Item>
          <p>
            <strong>
              ***Please be aware that ALL shelter staff are mandatory reporters,
              therefore any behavior toward your child that a staff member is
              concerned about will result in a report to CPS.
            </strong>
          </p>
        </Form.Item>
      </Card>
    </div>
  );
};

export default SuspensionAgreement;
