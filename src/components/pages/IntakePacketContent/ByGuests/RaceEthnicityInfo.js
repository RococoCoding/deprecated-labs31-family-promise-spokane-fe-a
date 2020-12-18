import React from 'react';
import { Form, Button, Space, Checkbox, Row, Col, Card } from 'antd';

const RaceEthnicityInfo = ({ navigation, formData, tempFormStyle }) => {
  const { previous, next } = navigation;
  let { familyMember } = formData;
  const options = [
    'Hispanic/Latino',
    'American Indian or Alaska Native',
    'Asian',
    'Black orAfricanAmerican',
    'NativeHawaiianOr PacificIslander',
    'White',
    'Unknown',
    'Refuse',
  ];

  const setFormRace = e => {
    familyMember[0].demographics.race.push(e.target.value);
  };

  return (
    <div style={tempFormStyle}>
      <Card title="Race/Ethnicity Info" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>

        <Form layout="vertical">
          <h3>
            Please answer the following questions about race. Check all that
            apply for EACH family member.
          </h3>
          {Object.keys(formData.familyMember).map((mem, key) => (
            <>
              <p>{familyMember[mem].demographics.first_name}</p>

              <Space>
                <Checkbox.Group
                  defaultValue={familyMember[mem].demographics.race}
                >
                  <Row>
                    {options.map(race => (
                      <Col span={3} style={{ display: 'inline-block' }}>
                        <Form.Item label={race}>
                          <Checkbox
                            onChange={setFormRace}
                            defaultChecked={true}
                            value={race}
                          />
                        </Form.Item>
                      </Col>
                    ))}
                  </Row>
                </Checkbox.Group>
              </Space>
            </>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default RaceEthnicityInfo;
