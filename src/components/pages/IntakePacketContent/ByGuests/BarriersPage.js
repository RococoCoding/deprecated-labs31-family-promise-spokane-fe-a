import React from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  Checkbox,
  Row,
  Col,
  Card,
  Progress,
  Divider,
} from 'antd';

const BarriersPage = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
  nameString,
  steps,
  step,
}) => {
  const pageNumber = steps.findIndex(item => item === step);
  const pages = steps.length;
  const percent = ((pageNumber + 1) / pages) * 100;
  const { previous, next } = navigation;
  const { familyMember } = formData;
  const { TextArea } = Input;
  const options = [
    'Alcohol Abuse',
    'Developmental Disability',
    'Chronic Health Issues',
    'Drug Abuse',
    'HIV/AIDS',
    'Mental Illness',
    'Physical Disability',
  ];
  const optionDataName = {
    'Alcohol Abuse': 'alcohol_abuse',
    'Developmental Disability': 'developmental_disabilities',
    'Chronis Health Issues': 'chronic_health_issues',
    'Drug Abuse': 'drug_abuse',
    'HIV/AIDS': 'HIV-AIDs',
    'Mental Illness': 'mental_illness',
    'Physical Disability': 'physical_disabilities',
  };

  return (
    <div style={tempFormStyle}>
      <Progress percent={percent} status="active" showInfo={false} />
      <Card title="Barriers" bordered={false}>
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
            Next
          </Button>
        </Form.Item>
        <h3>
          Please answer the following questions about barriers. Check all that
          apply for EACH family member.
        </h3>
        <Form layout="vertical">
          {Object.keys(formData.familyMember).map((mem, key) => (
            <>
              <Divider orientation="left" plain>
                {familyMember[mem].demographics.first_name}
              </Divider>

              <Space key={`${mem}${key}`}>
                <Row justify={'space-between'} align={'top'}>
                  {options.map(barrier => (
                    <Col span={6}>
                      <Form.Item
                        label={barrier}
                        style={{
                          display: 'flex',
                          flexDirection: 'column-reverse',
                          paddingRight: '20px',
                        }}
                      >
                        <Checkbox
                          defaultChecked={
                            familyMember[mem].barriers[optionDataName[barrier]]
                          }
                          name={nameString(
                            mem,
                            `barriers.${optionDataName[barrier]}`
                          )}
                          onChange={setForm}
                        />
                      </Form.Item>
                    </Col>
                  ))}
                </Row>
              </Space>

              <Form.Item label="Please list any documented disabilities or chronic health issues as well as any major allergies">
                <TextArea
                  name={nameString(mem, 'barriers.list_issues')}
                  onChange={setForm}
                  value={familyMember[mem].barriers.list_issues}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                ></TextArea>
              </Form.Item>
              <Form.Item label="Please list Indefinite Conditions for each family member (Alcohol Abuse, Developmental Disability, Chronic Health Issue, Mental Illness, etc.)">
                <TextArea
                  name={nameString(mem, 'barriers.list_indefinite_conditions')}
                  onChange={setForm}
                  value={familyMember[mem].barriers.list_indefinite_conditions}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                ></TextArea>
              </Form.Item>
            </>
          ))}
        </Form>
      </Card>
    </div>
  );
};

export default BarriersPage;
