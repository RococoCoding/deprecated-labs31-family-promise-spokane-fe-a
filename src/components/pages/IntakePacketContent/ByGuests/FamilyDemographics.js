import React from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  DatePicker,
  InputNumber,
  Card,
  Select,
} from 'antd';
import moment from 'moment';
const FamilyDemographics = ({
  navigation,
  formData,
  setForm,
  tempFormStyle,
  nameString,
}) => {
  const { previous, next } = navigation;
  const { familyMember } = formData;
  const genderOptions = ['Male', 'Female', 'Other'];

  /*Issues with setForm on inputs other than Input and Checkbox. 
  The following functions manually update the entire form. */
  let x = 0;
  const setFormDate = (e, dateString) => {
    familyMember[x] = Object.assign(familyMember[x], {
      ...familyMember[x],
      demographics: { ...familyMember[x].demographics, DOB: dateString },
    });
  };
  const setFormNumber = value => {
    familyMember[x] = Object.assign(familyMember[x], {
      ...familyMember[x],
      demographics: { ...familyMember[x].demographics, employer: value },
    });
  };
  const setFormSSN = value => {
    familyMember[x] = Object.assign(familyMember[x], {
      ...familyMember[x],
      demographics: { ...familyMember[x].demographics, SSN: value },
    });
  };
  const setFormSelect = value => {
    familyMember[x] = Object.assign(familyMember[x], {
      ...familyMember[x],
      demographics: { ...familyMember[x].demographics, gender: value },
    });
  };
  return (
    <div style={tempFormStyle}>
      <Card title="Family Demographics" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
            Previous
          </Button>
          <Button type="primary" htmlType="button" onClick={next}>
            Next
          </Button>
        </Form.Item>
        <Form layout="vertical">
          {/*Displays family members currently in formData */}
          {Object.keys(formData.familyMember).map((mem, key) => (
            <div key={key}>
              {(x = mem)}
              <p>{familyMember[mem].demographics.first_name}</p>
              <Space
                style={{ display: 'flex', marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item label="Gender">
                  <Select
                    placeholder="Please select an option"
                    defaultValue={familyMember[mem].demographics.gender}
                    onChange={setFormSelect}
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
                    onChange={setFormDate}
                  />
                </Form.Item>
                <Form.Item label="Last 4 of SSN">
                  <InputNumber
                    placeholder="0000"
                    onChange={setFormSSN}
                    defaultValue={familyMember[mem].demographics.employer}
                  />
                </Form.Item>
                <Form.Item
                  label="Income Source (monthly)"
                  tooltip="An income source can be a Job, TANF, SSI, SSDI, ChildSupport, etc..."
                >
                  <Input.Group compact>
                    <Form.Item>
                      <Input
                        placeholder="Income source"
                        name={nameString(mem, 'demographics.income')}
                        value={familyMember[mem].demographics.income}
                        onChange={setForm}
                      />
                    </Form.Item>
                    <Form.Item>
                      <InputNumber
                        onChange={setFormNumber}
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
