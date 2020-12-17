import React from 'react';
import { Form, Input, Button, Space, Checkbox, Row, Col, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const RaceEthnicityInfo = ({ navigation, formData, tempFormStyle }) => {
  const { previous, next } = navigation;
  const { familyMember } = formData;
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
  let raceSet = new Set();
  const setFormRace = value => {
    familyMember[0] = Object.assign(familyMember[0], {
      ...familyMember[0],
      demographics: { ...familyMember[0].demographics, race: value },
    });
  };
  const onCheck = e => {
    const checked = e.target.checked;
    const value = e.target.value;
    if (checked == true) {
      raceSet.add(value);
    } else if (checked == false) {
      raceSet.delete(value);
    }
    setFormRace(raceSet);
    console.log(familyMember[0].demographics.race);
  };
  const initChecked = mem => {
    const arr = [];
    options.map(race => {
      if (familyMember[mem].demographics.race.has(race)) {
        arr.push(race);
      }
    });
    return arr;
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
          {console.log(familyMember[0].demographics)}
          <h3>
            Please answer the following questions about race. Check all that
            apply for EACH family member.
          </h3>
          {Object.keys(formData.familyMember).map((mem, key) => (
            <Space>
              <p>{familyMember[mem].demographics.first_name}</p>
              <Checkbox.Group defaultValue={initChecked(mem)}>
                <Row>
                  {options.map(race => (
                    <Col span={3} style={{ display: 'inline-block' }}>
                      <Form.Item label={race}>
                        <Checkbox
                          onChange={onCheck}
                          defaultChecked={true}
                          value={race}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Space>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default RaceEthnicityInfo;
