import React from 'react';
import { Form, Input, Button, Checkbox, Select, InputNumber, Card } from 'antd';

const { Option } = Select;
const Insurance = ({ navigation, tempFormStyle, formData, setForm }) => {
  const { previous, next } = navigation;
  const { familyInfo, familyMember } = formData;

  const handleSelect = (value, name) => {
    console.log(value, name, familyInfo.insurance.members_covered);
  };
  const handleCheck = value => {
    console.log(familyInfo.insurance);
    console.log(familyInfo.insurance);
  };
  const updateFormData = () => {};
  const insuranceSources = [
    'State',
    'Private',
    'Employment',
    'Medicaid',
    'Medicare',
    'Other',
  ];
  return (
    <div style={tempFormStyle}>
      <Card title="Family Members" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={handleCheck}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <h1>Insurance</h1>
        <Form
          layout="vertical"
          style={{ maxWidth: '800px', alignItems: 'center' }}
        >
          <Form.Item>
            <Checkbox
              name="familyInfo.insurance.has_insurance"
              onChange={setForm}
            >
              Do you have insurance?
            </Checkbox>
          </Form.Item>
          <Form.Item label="Health insurance source ">
            <Input
              name="familyInfo.insurance.health_insurance_type"
              value={familyInfo.insurance.health_insurance_type}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label="Household Members covered">
            <Input
              name="familyInfo.insurance.members_covered"
              value={familyInfo.insurance.members_covered}
              onChange={setForm}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Insurance;
