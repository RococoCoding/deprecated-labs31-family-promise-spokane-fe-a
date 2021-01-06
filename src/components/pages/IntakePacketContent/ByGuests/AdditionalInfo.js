import React from 'react';
import {
  Form,
  Button,
  Card,
  Input,
  Checkbox,
  Row,
  Col,
  Progress,
  Divider,
} from 'antd';
import { axiosWithAuth } from '../../../../api/axiosWithAuth';
import { useHistory } from 'react-router-dom';
import {
  returnPercentComplete,
  filterNotNull,
  sumOfObj,
} from '../../../../utils/percentComplete';

const AdditionalInfo = ({
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
  const { previous } = navigation;
  const { familyInfo, familyMember } = formData;
  const history = useHistory();

  const submitHandlder = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(`families`, familyInfo)
      .then(res => {
        const familyId = res.data.families.id;
        Object.keys(formData.familyMember).map(mem => {
          familyMember[mem]['family_id'] = familyId;
          axiosWithAuth()
            .post('members', familyMember[mem])
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log('MemberError', err.response);
            });
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
  const VehicleInfo = ['Vehicle Make', 'Model', 'Year', 'Color', 'License #'];
  const VehicleInfoDataNames = {
    'Vehicle Make': 'make',
    Model: 'model',
    Year: 'year',
    Color: 'color',
    'Lic #': 'license_plate',
  };
  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Additional Information" bordered={false}>
        <Form.Item style={{ backgroundColor: 'blue' }}>
          <Button
            type="primary"
            htmlType="button"
            onClick={previous}
            style={{ marginRight: '40px' }}
          >
            Previous
          </Button>

          <Button
            type="primary"
            style={{ backgroundColor: 'green', border: '3px solid black' }}
            htmlType="Submit"
            onClick={submitHandlder}
          >
            Submit
          </Button>
        </Form.Item>

        <Form layout="vertical">
          <Form.Item
            label="Vehicle Information:"
            style={{ marginBottom: '40px' }}
          >
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
          <Divider />
          <Form.Item label="Please check all that you currently receive:">
            <Row justify={'space-between'} align={'top'}>
              {GOVBenifits.map(benifit => (
                <Col span={4}>
                  <Form.Item
                    label={benifit}
                    style={{
                      display: 'flex',
                      flexDirection: 'column-reverse',
                      paddingRight: '20px',
                    }}
                  >
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
          <Divider />

          <Form.Item>
            <Checkbox
              style={{ marginBottom: '10px' }}
              name="familyInfo.insurance.pregnancies.is_pregnant"
              onChange={setForm}
              defaultChecked={familyInfo.insurance.pregnancies.is_pregnant}
            >
              Is any one in your household pregnant?
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
