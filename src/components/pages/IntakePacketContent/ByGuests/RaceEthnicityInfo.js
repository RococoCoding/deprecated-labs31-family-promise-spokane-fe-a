import React from 'react';
import IntakeButton from '../IntakeButtons';

import { Form, Space, Checkbox, Row, Col, Card, Progress, Divider } from 'antd';
const RaceEthnicityInfo = ({
  navigation,
  formData,
  tempFormStyle,
  steps,
  step,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;
  let { familyMember } = formData;
  const options = [
    'Hispanic/Latino',
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Native Hawaiian or Pacific Islander',
    'White',
    'Unknown',
    'Decline to Answer',
  ];

  const setFormRace = mem => e => {
    familyMember[mem].demographics.race.push(e.target.value);
  };

  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Race/Ethnicity Info" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          <h3>
            Please answer the following questions about race. Check all that
            apply for EACH family member.
          </h3>
          {Object.keys(formData.familyMember).map((mem, key) => (
            <div>
              <Divider orientation="left" plain>
                {familyMember[mem].demographics.first_name}
              </Divider>
              <Space>
                <Checkbox.Group
                  defaultValue={familyMember[mem].demographics.race}
                >
                  <Row justify={'space-between'} align={'top'}>
                    {options.map(race => (
                      <Col span={6}>
                        <Form.Item
                          label={race}
                          style={{
                            display: 'flex',
                            flexDirection: 'column-reverse',
                            paddingRight: '20px',
                          }}
                        >
                          <Checkbox
                            onChange={setFormRace(mem)}
                            defaultChecked={true}
                            value={race}
                          />
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Space>
            </div>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default RaceEthnicityInfo;
