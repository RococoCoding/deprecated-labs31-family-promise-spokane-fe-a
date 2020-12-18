import React from 'react';
import { Form, Input, Button, Checkbox, Card } from 'antd';
import axios from 'axios';
const Insurance = ({ navigation, tempFormStyle, formData, setForm }) => {
  const { previous } = navigation;
  const { familyInfo, familyMember } = formData;

  const submitHandlder = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/families`, familyInfo)
      .then(res => {
        console.log(res);
        Object.keys(formData.familyMember).map(mem => {
          axios
            .post('http://localhost:8080/members', familyMember[mem])
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        });
      })
      .catch(err => console.log(err));
  };
  return (
    <div style={tempFormStyle}>
      <Card title="Insurance" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="Submit" onClick={submitHandlder}>
            Submit
          </Button>
        </Form.Item>
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
