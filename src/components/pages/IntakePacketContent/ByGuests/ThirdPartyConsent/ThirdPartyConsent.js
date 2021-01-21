/*
Requires Signatures from Client and Staff for clause in Third Party Consent form 
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

const ThirdPartyConsent = ({
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
  //Progress bar
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. 

  Unable make keys dynamic in spread (currently not DRY code)
  You must create a new function for each input feild or make keys dynamic.
  */

  return (
    <div style={tempFormStyle}>
      {/*Progress bar*/}
      <Progress percent={percent} status="active" showInfo={false} />

      <Card title="Third Party Consent Form" bordered={false}>
        <IntakeButton navigation={navigation} />

        <h3>
          Consent To Release Information to a Third Party from family
          promise/open doors spokane Confidentiality statement
        </h3>
        <p>
          As a client or former client of a Family Promise program, you must
          give Family Promise/Open Doors written permission before it will
          discuss or otherwise exchange your information with a third party
          (e.g., a probation/parole officer, lawyer, relative, agency, etc.),
          including the mere confirmation of whether you participated in a
          Family Promise program. You may request a review of your counseling or
          other records with a staff person at a reasonable time. However, the
          confidential information of other individuals may not be reviewed
          absent their written consent on a form like this one. In order to
          provide you the best service, Family Promise/Open Doors may internally
          exchange information between its different components on a
          need-to-know basis. Under all circumstances, your confidentiality will
          be respected and guarded. This notice and consent-to-release form
          describes how mental-health, substance abuse-related, and other
          information about you may be used and disclosed and how you can obtain
          access to such information. Please review it carefully. NOTICE TO
          AGENCY OR INDIVIDUAL RECEIVING CONFIDENTIAL INFORMATION: This
          information has been disclosed to you from records that may be
          protected by federal and state confidentiality rules (e.g., those
          codified at 42 C.F.R. part 2, those of the Health Insurance
          Portability and Accountability Act (“HIPAA”), or other applicable laws
          and regulations). Generally, the federal and state rules prohibit you
          from further disclosing this information unless expressly permitted by
          the written consent of the person to whom it pertains or as otherwise
          permitted by applicable laws and regulations. A general authorization
          for the release of medical or other information is NOT sufficient for
          that purpose. The federal rules restrict any use of the information to
          criminally investigate or prosecute any patient being treated for
          alcohol or substance abuse. Client’s Release of Confidential
          information Your records are considered confidential and may be
          protected by federal law and regulations. They will not be released to
          other individuals or agencies without your written consent, which you
          are providing through this form. However, certain information
          protected by 42 C.F.R. part 2 may be released without your
          authorization under the following circumstances: 1) Upon Family
          Promises’ receipt of a legitimate court order; 2) to medical personnel
          in a medical emergency; 3) to qualified personnel for research, audit,
          or program evaluation; 4) if you threaten or commit a crime on the
          program premises or against Family Promise personnel; 5) if there is
          evidence to suggest child abuse or neglect, or risk of harm to a
          child; 6) if you pose a threat of serious harm to self or to others;
          7) if necessary to provide a counseling-related service, Family
          Promise staff may internally share your information with other Family
          Promise staff, strictly on a need-to-know basis; and 8) if there is a
          Qualified Service Organization Agreement (“QSOA”) in effect for a
          specific service, e.g., laboratory or medical services. Violation of
          certain confidentiality rules is a crime and may be reported to Family
          Promise. Please ask Family Promise staff for help if you are concerned
          or need assistance understanding any part of this form. EACH SECTION
          MUST BE COMPLETED
        </p>
        <Form>
          <Form.Item>
            I. I, <Input bordered={false} /> <hr />, hearby knowingly and
            voluntarily consent to and authorize the release of information from
            my records as specified below.
          </Form.Item>

          <Form.Item>
            II. The information may be exchanged between the following
            persons/organizations: Name of Facility:{' '}
            <bold>Family Promise/Open Doors of Spokane</bold> <br />
            Address: 2002 E Mission Ave, Spokane, WA 99202 <br /> and <br />
            Name of Individual, Agency, or Facility: Salvation Army of Spokane –
            DSHS - CPS - DCYF - Passages - SHA - SVA - Vanessa Behan - Catholic
            Charities - HFCA - Spokane Public Schools, Frontier Behavioral
            Health, St. Margarets - Any agency deemed appropriate by FPS Other:{' '}
            <Input />
            Address: <Input />
          </Form.Item>
          <Form.Item>
            III. These persons/organizations may communicate regarding and
            disclose to each other information related to me and my household
            **The information to be released may be communicated to a 3rd party:
            In writing, verbally or electronically
            <hr />I understand that I may revoke this authorization at any time,
            except to the extent that action has already been taken in reliance
            upon it. This authorization must be revoked in writing for data
            protected under HIPAA but may be revoked orally for data protected
            under 42 C.F.R. part 2. One of the persons/organizations to which
            information is being released can provide you with a form for
            revoking your consent, if applicable. If this authorization is not
            specifically revoked earlier, it will terminate after: One year from
            date of signature below I understand that I might be denied services
            if I refuse to consent to a disclosure for purposes of treatment,
            payment, or healthcare operations, if permitted by law. I will not
            be denied services if I refuse to consent to a disclosure for other
            purposes. **Above mentioned consent will include information about
            any minor children in my care.
          </Form.Item>
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
            <p>
              {' '}
              <bold>*** MUST BE SIGNED BY ALL ADULTS IN HOUSEHOLD ***</bold>
            </p>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ThirdPartyConsent;
