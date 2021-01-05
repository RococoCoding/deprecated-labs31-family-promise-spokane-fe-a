import React from 'react';
import {
  Form,
  Button,
  Space,
  Checkbox,
  Row,
  Col,
  Card,
  Progress,
  Typography,
  Divider,
} from 'antd';
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
  const { previous, next } = navigation;
  let { familyMember } = formData;
  const options = [
    'Hispanic/Latino',
    'American Indian or Alaska Native',
    'Asian',
    'Black or African American',
    'Native HawaiianOr Pacific Islander',
    'White',
    'Unknown',
    'Refuse',
  ];

  const setFormRace = mem => e => {
    familyMember[mem].demographics.race.push(e.target.value);
  };

  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
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
