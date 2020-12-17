import React from 'react';
import {
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  Checkbox,
  Card,
} from 'antd';
const HomelessHistory = ({ navigation, formData, setForm, tempFormStyle }) => {
  const { previous, next } = navigation;
  const { familyInfo } = formData;
  return (
    <div style={tempFormStyle}>
      <Card title="History" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <Form layout="vertical">
          <Form.Item label="Last permanent address (last address you lived where you did not consider yourself to be homeless">
            <Input
              name={'familyInfo.last_permanent_address'}
              value={familyInfo.last_permanent_address}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label="Where did you stay last night?">
            <Input
              name={'familyInfo.homeless_info.prior_location'}
              value={familyInfo.homeless_info.prior_location}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label="How long were you at this location?">
            <Form.Item label="Days">
              <Input
                name={'familyInfo.homeless_info.length_at_prior_location'}
                value={familyInfo.homeless_info.length_at_prior_location}
                onChange={setForm}
              />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Aprroximately when did you become homeless?">
            <Input
              name={'familyInfo.homeless_info.homeless_start_date'}
              value={familyInfo.homeless_info.homeless_start_date}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label="How many times in the last 3 years have you been homeless?">
            <Input
              name={'familyInfo.homeless_info.num_times_homeless'}
              value={familyInfo.homeless_info.num_times_homeless}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label="How many total months in those 3 years have you been homeless?">
            <Input
              name={'familyInfo.homeless_info.total_len_homeless'}
              value={familyInfo.homeless_info.total_len_homeless}
              onChange={setForm}
            />
          </Form.Item>
          <Form.Item label=" If yes when?">
            <Input
              name={'familyInfo.homeless_info.length_at_current_location'}
              value={familyInfo.homeless_info.length_at_current_location}
              onChange={setForm}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default HomelessHistory;
