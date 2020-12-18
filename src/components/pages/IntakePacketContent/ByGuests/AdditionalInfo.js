import React from 'react';
import { Form, Button, Card, Input, Checkbox, Row, Col } from 'antd';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdditionalInfo = ({ navigation, tempFormStyle, formData, setForm }) => {
  const { previous } = navigation;
  const { familyInfo, familyMember } = formData;
  const history = useHistory();

  const submitHandlder = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:8888/families`, familyInfo)
      .then(res => {
        console.log(res);
        Object.keys(formData.familyMember).map(mem => {
          axios
            .post('http://localhost:8888/members', familyMember[mem])
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log('MemberError', err);
            });
          history.push('/me');
        });
      })
      .catch(err => console.log('FamiliesError', err));
  };
  const familyInfoNameString = (section, value) => {
    return `familyInfo.${section}.${value}`;
  };
  const GOVBenifits = [
    'Foodstamps',
    'CPS/FPS (Open case)',
    'RRH (Rapid Rehousing) ',
    'Housing Voucher (Current)',
    'Veteran Services',
    'SNAP assistance',
  ];
  const GOVBenifitsDataName = {
    Foodstamps: 'foodstamps',
    'CPS/FPS (Open case)': 'cps_fps',
    'RRH (Rapid Rehousing) ': 'RRH',
    'Housing Voucher (Current)': 'housing_voucher',
    'Veteran Services': 'veteran_services',
    'SNAP assistance': 'snap',
  };
  const VehicleInfo = ['Vehicle Make', 'Model', 'Year', 'Color', 'Lic #'];
  const VehicleInfoDataNames = {
    'Vehicle Make': 'make',
    Model: 'model',
    Year: 'year',
    Color: 'color',
    'Lic #': 'license_plate',
  };
  return (
    <div style={tempFormStyle}>
      <Card title="Additional Information" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="button" htmlType="Submit" onClick={submitHandlder}>
            Submit
          </Button>
        </Form.Item>

        <Form layout="vertical">
          <Form.Item label="Vehicle Information:">
            <Input.Group>
              {VehicleInfo.map((label, key) => (
                <Form.Item label={label} key={key}>
                  <Input
                    name={familyInfoNameString(
                      'vehicle',
                      VehicleInfoDataNames[label]
                    )}
                    value={familyInfo.vehicle[VehicleInfoDataNames[label]]}
                    onChange={setForm}
                  />
                </Form.Item>
              ))}
            </Input.Group>
          </Form.Item>

          <Form.Item label="Please check all that you currently receive:">
            <Row>
              {GOVBenifits.map(benifit => (
                <Col span={4}>
                  <Form.Item label={benifit}>
                    <Checkbox
                      defaultChecked={
                        familyInfo.gov_benefits[GOVBenifitsDataName[benifit]]
                      }
                      name={familyInfoNameString(
                        'gov_benefits',
                        GOVBenifitsDataName[benifit]
                      )}
                      onChange={setForm}
                    />
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </Form.Item>

          <Form.Item>
            <Checkbox
              style={{ marginBottom: '10px' }}
              name="familyInfo.insurance.pregnancies.is_pregnant"
              onChange={setForm}
              defaultChecked={familyInfo.insurance.pregnancies.is_pregnant}
            >
              Is any one in your Household pregnant?
            </Checkbox>
            <Form.Item label="If yes, who?">
              <Input
                name="familyInfo.insurance.pregnancies.if_yes_who"
                value={familyInfo.insurance.pregnancies.if_yes_who}
                onChange={setForm}
              />
            </Form.Item>
            <Form.Item label="When is the due date?">
              <Input
                name="familyInfo.insurance.pregnancies.due_date"
                value={familyInfo.insurance.pregnancies.due_date}
                onChange={setForm}
              />
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdditionalInfo;
