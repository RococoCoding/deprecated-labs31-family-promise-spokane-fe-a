import React from 'react';
import { Form, Input, Button, Space, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const FamilyMembers = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  count,
  setCount,
  nameString,
}) => {
  const addMember = key => {
    formData.familyMember[key] = {
      demographics: {
        first_name: '',
        last_name: '',
        gender: '',
        relationship: '',
        DOB: '',
        SSN: '',
        income: '',
        employer: '',
        race: '',
      },
      bearers: {
        alcohol_abuse: false,
        developmental_disabilities: false,
        chronic_health_issues: false,
        drug_abuse: false,
        'HIV-AIDs': false,
        mental_illness: false,
        physical_disabilities: false,
        list_indefinite_conditions: null,
        list_issues: null,
      },
      schools: {
        highest_grade_completed: '',
        enrolled_status: true,
        reason_not_enrolled: '',
        attendance_status: '',
        school_type: '',
        school_name: '',
        mckinney_school: false,
      },
      flag: '',
      pet: 0,
    };
  };
  const { previous, next } = navigation;
  const { familyMember } = formData;

  const onChangeHandlder = () => {
    addMember(count);
    setCount(count + 1);
  };

  return (
    <div style={tempFormStyle}>
      <Card title="Family Members" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <Form layout="vertical">
          {/*Displays family members currently in formData */}
          {Object.keys(formData.familyMember).map((mem, key) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
                align: 'baseline',
              }}
            >
              <Form.Item label="Fullname">
                <Input
                  name={nameString(mem, 'demographics.first_name')}
                  value={familyMember[mem].demographics.first_name}
                  onChange={setForm}
                ></Input>
              </Form.Item>
              <Form.Item label="Relationship">
                <Input
                  name={nameString(mem, 'demographics.relationship')}
                  value={familyMember[mem].demographics.relationship}
                  onChange={setForm}
                />
              </Form.Item>
            </Space>
          ))}
          {/*Creates new family member object in formData */}
          <Button onClick={onChangeHandlder}>Add Member</Button>
        </Form>
      </Card>
    </div>
  );
};

export default FamilyMembers;
