import React from 'react';
import { Form, Input, Button, Space, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const FamilyMembers = ({ navigation, formData, setForm, tempFormStyle }) => {
  const { previous, next } = navigation;
  const { familyMember, familyInfo } = formData;

  const last = 'tate burger';
  const first = 'temp';
  const handleAddButton = value => {
    console.log('helloworld', value);
  };
  const onChangeHandlder = value => {
    console.log(value.target.value);
    console.log(familyInfo);
  };

  const addMember = (firstname, lastName, relationship) => {
    formData.familyMember[`${firstname}${lastName}`] = {
      demographics: {
        first_name: firstname,
        last_name: lastName,
        gender: '',
        relationship: relationship,
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
                  name="familyMember.tateburger.demographics.first_name"
                  value={familyMember.tateburger.demographics.first_name}
                  onChange={setForm}
                ></Input>
              </Form.Item>
              <Form.Item label="Relationship">
                <Input
                  name="familyMember.tateburger.demographics.relationship"
                  value={familyMember.tateburger.demographics.relationship}
                  onChange={setForm}
                />
              </Form.Item>
            </Space>
          ))}
          <Form.List name="users">
            {(fields, { add, remove }) => (
              <>
                {fields.map(field => (
                  <Space
                    key={field.key}
                    style={{
                      display: 'flex',
                      marginBottom: 8,
                      align: 'baseline',
                    }}
                  >
                    <Form.Item label="First">
                      <Input
                        name={`familyMember[${first}]`}
                        onChange={onChangeHandlder}
                        placeholder="First Name"
                      />
                    </Form.Item>
                    <Form.Item label="Last">
                      <Input
                        name={`familyMember[${last}]`}
                        placeholder="Last Name"
                      />
                    </Form.Item>
                    <Form.Item label="Relationship">
                      <Input placeholder="Relationship" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={add}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add field
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      </Card>
    </div>
  );
};

export default FamilyMembers;
