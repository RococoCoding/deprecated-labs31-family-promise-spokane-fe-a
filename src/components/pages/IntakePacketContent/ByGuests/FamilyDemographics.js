import React from 'react';
import IntakeButton from '../IntakeButtons';

import {
  Form,
  Input,
  Space,
  DatePicker,
  InputNumber,
  Card,
  Select,
  Progress,
  Divider,
} from 'antd';
import moment from 'moment';
const FamilyDemographics = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  nameString,
  steps,
  step,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;
  const { familyMember } = formData;
  const genderOptions = ['Male', 'Female', 'Decline to Answer'];

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. */
  const setFormDate = mem => (e, dateString) => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, DOB: dateString },
    });
  };
  const setFormNumber = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, employer: value },
    });
  };
  const setFormSSN = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, SSN: value },
    });
  };
  const setFormSelect = mem => value => {
    familyMember[mem] = Object.assign(familyMember[mem], {
      ...familyMember[mem],
      demographics: { ...familyMember[mem].demographics, gender: value },
    });
  };
  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Family Demographics" bordered={false}>
        <IntakeButton navigation={navigation} />

        <Form layout="vertical">
          {/*Displays family members currently in formData */}
          {Object.keys(formData.familyMember).map((mem, key) => (
            <div key={key}>
              <Divider orientation="left" plain>
                {familyMember[mem].demographics.first_name}
              </Divider>
              <Space
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item label="Gender" style={{ width: '200px' }}>
                  <Select
                    placeholder="Please select an option"
                    defaultValue={familyMember[mem].demographics.gender}
                    onChange={setFormSelect(mem)}
                  >
                    {genderOptions.map(option => (
                      <Select.Option value={option}>{option}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label="Birthdate">
                  <DatePicker
                    format="DD/MM/YYYY"
                    name={nameString(mem, 'demographics.DOB')}
                    defaultValue={moment(
                      familyMember[mem].demographics.DOB != null
                        ? familyMember[mem].demographics.DOB
                        : '01/01/2020',
                      'DD/MM/YYYY'
                    )}
                    onChange={setFormDate(mem)}
                  />
                </Form.Item>
                <Form.Item label="Last 4 of SSN">
                  <InputNumber
                    placeholder="0000"
                    onChange={setFormSSN(mem)}
                    defaultValue={familyMember[mem].demographics.employer}
                  />
                </Form.Item>
                <Form.Item
                  label="Income Source (monthly)"
                  tooltip="An income source can be a job, TANF, SSI, SSDI, Child Support, etc."
                >
                  <Input.Group compact>
                    <Form.Item style={{ width: '200px' }}>
                      <Input
                        placeholder="Income source"
                        name={nameString(mem, 'demographics.income')}
                        value={familyMember[mem].demographics.income}
                        onChange={setForm}
                      />
                    </Form.Item>
                    <Form.Item>
                      <InputNumber
                        onChange={setFormNumber(mem)}
                        formatter={value => `$ ${value}`}
                        defaultValue={familyMember[mem].demographics.employer}
                      />
                    </Form.Item>
                  </Input.Group>
                </Form.Item>
              </Space>
            </div>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default FamilyDemographics;
