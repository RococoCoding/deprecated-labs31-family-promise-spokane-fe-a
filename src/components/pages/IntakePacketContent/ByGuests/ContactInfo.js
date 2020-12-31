import React from 'react';
import { Form, Input, Space, Button, Card, Progress } from 'antd';

import Checkbox from 'antd/lib/checkbox/Checkbox';
const ContactInfo = ({ navigation, formData, setForm, tempFormStyle }) => {
  Object.filter = (obj, predicate) =>
    Object.assign(
      ...Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .map(key => ({ [key]: obj[key] }))
    );
  function ObjectLength(object) {
    var length = 0;
    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        ++length;
      }
    }
    return length;
  }

  const { next, previous } = navigation;
  const { familyInfo } = formData;
  const info = [familyInfo];
  console.log(info);
  const onProgress = () => {
    const total =
      ObjectLength(familyInfo.phone_one) +
      ObjectLength(familyInfo.phone_two) +
      ObjectLength(familyInfo.emergencyContact);
    const phone1 =
      Object.filter(familyInfo.phone_one, item => item != null) || {};
    const phone2 =
      Object.filter(familyInfo.phone_two, item => item != null) || {};
    const emerg =
      Object.filter(familyInfo.emergencyContact, item => item != null) || {};
    const sum =
      Object.keys(phone1).length +
      Object.keys(phone2).length +
      Object.keys(emerg).length;
    console.log(`${sum}/${total}`);
    return next;
  };

  return (
    <div style={tempFormStyle}>
      <Progress percent={familyInfo.percent_complete} />
      <Card title="Contact Info" bordered={false}>
        <Form layout="vertical" name="control-hooks" span={18}>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={previous}>
              Previous
            </Button>
            <Button type="primary" htmlType="button" onClick={onProgress}>
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
