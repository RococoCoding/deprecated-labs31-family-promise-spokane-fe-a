import React from 'react';
import { Form, Input, Space, Button, Card } from 'antd';

import Checkbox from 'antd/lib/checkbox/Checkbox';
const ContactInfo = ({ navigation, formData, setForm, tempFormStyle }) => {
  const { next, previous } = navigation;
  const { familyInfo } = formData;

  const onFinish = values => {
    console.log(values);
  };

  return (
    <div style={tempFormStyle}>
      <Card title="Contact Info" bordered={false} onSubmit={onFinish}>
        <Form layout="vertical" name="control-hooks" span={18}>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={previous}>
              Previous
            </Button>
            <Button type="primary" htmlType="button" onClick={next}>
              Next
            </Button>
          </Form.Item>

          <h3>Please included both adults personal phone numbers:</h3>
          <Space style={{ display: 'flex' }}>
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.phone_one.name"
                value={familyInfo.phone_one.name}
                onChange={setForm}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.phone_one.number"
                value={familyInfo.phone_one.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>
          <Form.Item>
            <Checkbox
              name="familyInfo.phone_one.safeToLeaveMssg"
              onChange={setForm}
              checked={familyInfo.phone_one.safeToLeaveMssg}
            >
              Safe to leave message
            </Checkbox>
          </Form.Item>
          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.phone_two.name"
                value={familyInfo.phone_two.name}
                onChange={setForm}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.phone_two.number"
                value={familyInfo.phone_two.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>
          <Form.Item>
            <Checkbox
              name="familyInfo.phone_two.safeToLeaveMssg"
              onChange={setForm}
              checked={familyInfo.phone_two.safeToLeaveMssg}
            >
              Safe to leave message
            </Checkbox>
          </Form.Item>
          <h3>Emergancy Contact</h3>
          <Space style={{ display: 'flex', marginBottom: 8 }} align="baseline">
            <Form.Item>
              <Input
                placeholder="Full Name"
                name="familyInfo.emergencyContact.name"
                value={familyInfo.emergencyContact.name}
                onChange={setForm}
              ></Input>
            </Form.Item>
            <Form.Item>
              <Input
                placeholder="Number"
                name="familyInfo.emergencyContact.number"
                value={familyInfo.emergencyContact.number}
                onChange={setForm}
              ></Input>
            </Form.Item>
          </Space>
        </Form>
      </Card>
    </div>
  );
};

export default ContactInfo;
