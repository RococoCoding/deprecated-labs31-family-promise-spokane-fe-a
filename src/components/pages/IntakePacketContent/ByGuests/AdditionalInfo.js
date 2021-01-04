import React from 'react';
import { Form, Button, Card, Input, Checkbox, Row, Col, Progress } from 'antd';
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
  const percent = (pageNumber / pages) * 100;
  const { previous } = navigation;
  const { familyInfo, familyMember } = formData;
  const history = useHistory();

  const submitHandlder = e => {
    e.preventDefault();
    // Contact Info Page calculation ///
    const phone1 = filterNotNull(familyInfo.phone_one);
    const phone2 = filterNotNull(familyInfo.phone_two);
    const emerg = filterNotNull(familyInfo.emergencyContact);
    const contactSum = sumOfObj(phone1) + sumOfObj(phone2) + sumOfObj(emerg);
    console.log(` Contact Info: ${contactSum}/8 fields`);
    // Homeless Info Page calculation ///
    const lastPermanentAddress =
      familyInfo.last_permanent_address != null ? 1 : 0;
    const homelessInfo = filterNotNull(familyInfo.homeless_info);
    const sum = sumOfObj(homelessInfo) + lastPermanentAddress;
    console.log(`Homeless Info: ${sum}/8 fields`);
    // Domestic Info Page Calculation ////
    const domesticVInfo = filterNotNull(familyInfo.domestic_violence_info);
    const domesticInfoSum = sumOfObj(domesticVInfo);
    console.log(`Domestic Violence: ${domesticInfoSum}/5 fields`);
    // Insurance Info Page Calculation ////
    const insurance = filterNotNull(familyInfo.insurance);
    const insuranceSum = sumOfObj(insurance);
    console.log(`Insurance: ${insuranceSum}/3 fields`);
    // Additonal Info Page Calculation
    const govtBnfts = filterNotNull(familyInfo.gov_benefits);
    const govtBnftSum = sumOfObj(govtBnfts);
    const vechileInf = filterNotNull(familyInfo.vehicle);
    const vechileInfSum = sumOfObj(vechileInf);
    const pregnancyInfo = filterNotNull(familyInfo.insurance.pregnancies);
    const pregnancyInfoSum = sumOfObj(pregnancyInfo);
    const addInfoSum = govtBnftSum + vechileInfSum + pregnancyInfoSum;
    console.log(`Additional Info: ${addInfoSum}/14 fields `);
    console.log('formdata', formData);
    console.log('familyInfo', familyInfo);
    // Object.keys(formData.familyMember).map(mem => {
    //   const name = familyMember[mem].demographics['first_name'];
    //   console.log('mem', mem)
    //   const demographicInfo = filterNotNull(familyMember[mem].demographics);
    //   const demographicInfoSum = sumOfObj(demographicInfo);
    //   console.log(` Demogrpahics: ${demographicInfoSum}/8`);
    // });

    axiosWithAuth()
      .post(`families`, familyInfo)
      .then(res => {
        console.log(res);
        Object.keys(formData.familyMember).map(mem => {
          axiosWithAuth()
            .post('members', familyMember[mem])
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
      <Progress percent={percent} status="active" showInfo={false} />
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
