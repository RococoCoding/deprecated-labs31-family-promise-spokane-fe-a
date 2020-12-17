import React from 'react';
import { Form, Input, Button, Space, Select, Checkbox, Card } from 'antd';

const ChildSchoolInfo = ({
  navigation,
  tempFormStyle,
  setForm,
  formData,
  nameString,
}) => {
  const { familyMember } = formData;
  const { previous, next } = navigation;
  const { TextArea } = Input;
  const setFormAttend = (value, x) => {
    familyMember[0] = Object.assign(familyMember[0], {
      ...familyMember[0],
      schools: { ...familyMember[0].schools, attendance_status: value },
    });
  };
  const setFormType = (value, x) => {
    familyMember[0] = Object.assign(familyMember[0], {
      ...familyMember[0],
      schools: { ...familyMember[0].schools, school_type: value },
    });
  };
  const setFormGrade = (value, x) => {
    familyMember[0] = Object.assign(familyMember[0], {
      ...familyMember[0],
      schools: { ...familyMember[0].schools, highest_grade_completed: value },
    });
  };
  return (
    <div style={tempFormStyle}>
      <Card title="School Verification" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <Form layout="vertical">
          {Object.keys(formData.familyMember).map((mem, key) => (
            <Space
              key={key}
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item label="Highestgrade completed">
                <Select
                  placeholder="Please select an option"
                  defaultValue={
                    familyMember[mem].schools.highest_grade_completed
                  }
                  onChange={setFormGrade}
                >
                  <option value="spouse">Self</option>
                </Select>
              </Form.Item>
              <Form.Item label="Currently Enrolled?">
                <Checkbox
                  name={nameString(mem, 'schools.enrolled_status')}
                  defaultChecked={familyMember[mem].schools.enrolled_status}
                  onChange={setForm}
                />
              </Form.Item>
              <Form.Item label="Attendence Status">
                <Select
                  defaultValue={familyMember[mem].schools.attendance_status}
                  onChange={setFormAttend}
                  placeholder="Please select an option"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </Form.Item>
              <Form.Item label="School Type">
                <Select
                  placeholder="Please select an option"
                  defaultValue={familyMember[mem].schools.school_type}
                  onChange={setFormType}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Select>
              </Form.Item>
              <Form.Item label="School Name">
                <Input
                  placeholder="ex. Soap Lake MSHS"
                  name={nameString(mem, 'schools.school_name')}
                  value={familyMember[mem].schools.school_name}
                  onChange={setForm}
                />
              </Form.Item>
              <Form.Item label="Connected w/ McKinney-Vento School">
                <Checkbox
                  name={nameString(mem, 'schools.mckinney_school')}
                  defaultChecked={familyMember[mem].schools.mckinney_school}
                  onChange={setForm}
                />
              </Form.Item>
            </Space>
          ))}
          <Form.Item label="IF YOUR CHILD(REN) IS/ARE NOT ENROLLED IN SCHOOL AT THIS TIME PLEASE INDICATE THE REASON WHY BELOW">
            <TextArea
              autoSize={{ minRows: 3, maxRows: 5 }}
              name={nameString(0, 'schools.reason_not_enrolled')}
              onChange={setForm}
              value={familyMember[0].schools.reason_not_enrolled}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ChildSchoolInfo;
