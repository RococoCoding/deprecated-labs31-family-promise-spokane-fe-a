import React from 'react';
import { Form, Input, Space, Button, Card, Progress } from 'antd';
import {
  returnPercentComplete,
  completed,
} from '../../../../utils/percentComplete';

import Checkbox from 'antd/lib/checkbox/Checkbox';
const ContactInfo = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  step,
  steps,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;

  const { next, previous } = navigation;
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Contact Info" bordered={false}>
        <Form layout="vertical" name="control-hooks" span={18}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
          </div>

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
