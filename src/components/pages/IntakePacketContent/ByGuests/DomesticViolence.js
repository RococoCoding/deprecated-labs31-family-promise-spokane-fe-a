import React from 'react';
import { Form, Button, DatePicker, Checkbox, Radio, Card } from 'antd';
import moment from 'moment';
const DomesticViolence = ({ navigation, tempFormStyle, formData, setForm }) => {
  const { previous, next } = navigation;
  const { familyInfo } = formData;
  const setFormDate = (e, dateString) => {
    familyInfo = Object.assign(familyInfo, {
      ...familyInfo,
      domestic_violence_info: {
        ...familyInfo.domestic_violence_info,
        date_last_incident: dateString,
      },
    });
  };
  return (
    <div style={tempFormStyle}>
      <Card title="Domestic DomesticViolence" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <Form layout="vertical">
          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.fleeing_dv"
              defaultChecked={familyInfo.domestic_violence_info.fleeing_dv}
              onChange={setForm}
            >
              Are you Currently fleeing a DV situation?
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.anonymity_preferred"
              defaultChecked={
                familyInfo.domestic_violence_info.anonymity_preferred
              }
              onChange={setForm}
            >
              If so do you wish to be entered in HMIS anonymously?
            </Checkbox>
          </Form.Item>
          <Form.Item label="Date of most recent DV incident">
            <DatePicker
              format="DD/MM/YYYY"
              name="familyInfo.domestic_violence_info.date_last_incident"
              defaultValue={moment(
                familyInfo.domestic_violence_info.date_last_incident != ''
                  ? familyInfo.domestic_violence_info.date_last_incident
                  : '01/01/2020',
                'DD/MM/YYYY'
              )}
              onChange={setFormDate}
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.has_court_order"
              defaultChecked={familyInfo.domestic_violence_info.has_court_order}
              onChange={setForm}
            >
              Is there a No Contact or any other Court Order in place?
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Checkbox
              name="familyInfo.domestic_violence_info.YWCA_contacted"
              defaultChecked={familyInfo.domestic_violence_info.YWCA_contacted}
              onChange={setForm}
            >
              If you are fleeing DV, have you contacted the YWCA?
            </Checkbox>
          </Form.Item>

          <p>
            If not, please ask supervisor for the YWCA phone number to call.
          </p>
          <p style={{ maxWidth: '800px' }}>
            If you wish to be anonymous AND you have registered with the HFCA,
            we will need your HMIS # - This number is assigned to you by the
            HFCA - If you have not registered with the HFCA we can assign you an
            anonymous HMIS{' '}
          </p>
        </Form>
      </Card>
    </div>
  );
};

export default DomesticViolence;
