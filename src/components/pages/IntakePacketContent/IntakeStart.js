import React from 'react';
import { Form, Button, Card, Input } from 'antd';

const Insurance = ({ navigation, tempFormStyle, formData, setForm }) => {
  const { next } = navigation;
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      <Card title="Intake Form" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={next}>
            Start
          </Button>
        </Form.Item>
        <Form.Item label="Case #">
          <Input
            name="familyInfo.case_number"
            value={familyInfo.case_number}
            onChange={setForm}
          />
        </Form.Item>
      </Card>
    </div>
  );
};

export default Insurance;
