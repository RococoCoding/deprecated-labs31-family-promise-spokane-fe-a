import React from 'react';
import { Form, Input, Button, Space, Card, Progress } from 'antd';
const FamilyMembers = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  count,
  setCount,
  nameString,
  userId,
  steps,
  step,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;
  const addMember = key => {
    formData.familyMember[key] = {
      date_of_enrollment: null,
      demographics: {
        first_name: null,
        last_name: null,
        gender: null,
        relationship: null,
        DOB: null,
        SSN: null,
        income: null,
        employer: null,
        race: [],
        ethnicity: null,
      },
      barriers: {
        alcohol_abuse: null,
        developmental_disabilities: null,
        chronic_health_issues: null,
        drug_abuse: null,
        HIV_AIDs: null,
        mental_illness: null,
        physical_disabilities: null,
        list_indefinite_conditions: null,
        list_issues: null,
      },
      schools: {
        highest_grade_completed: null,
        enrolled_status: null,
        reason_not_enrolled: null,
        attendance_status: null,
        school_type: null,
        school_name: null,
        mckinney_school: null,
      },
      case_members: null,
      flag: null,
      percent_complete: 0,
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
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Family Members" bordered={false}>
        <Form.Item style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={previous}
            style={{ marginRight: '40px' }}
          >
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
              <Form.Item label="First Name">
                <Input
                  name={nameString(mem, 'demographics.first_name')}
                  value={familyMember[mem].demographics.first_name}
                  onChange={setForm}
                ></Input>
              </Form.Item>
              <Form.Item label="Last Name">
                <Input
                  name={nameString(mem, 'demographics.last_name')}
                  value={familyMember[mem].demographics.last_name}
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
