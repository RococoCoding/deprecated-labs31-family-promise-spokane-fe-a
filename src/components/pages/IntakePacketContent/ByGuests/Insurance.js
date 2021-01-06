import React from 'react';
import { Form, Input, Button, Checkbox, Card, Progress } from 'antd';
import {
  returnPercentComplete,
  completed,
} from '../../../../utils/percentComplete';

const Insurance = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
  steps,
  step,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;
  const { previous, next } = navigation;
  const { familyInfo } = formData;

  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Insurance" bordered={false}>
        <Form.Item>
          <Button
            type="primary"
            htmlType="button"
            onClick={previous}
            style={{ marginRight: '40px' }}
          >
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            next
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
              defaultChecked={familyInfo.insurance.has_insurance}
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
