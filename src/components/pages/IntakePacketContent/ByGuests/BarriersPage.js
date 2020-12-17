import React from 'react';
import { Form, Input, Button, Space, Checkbox, Row, Col, Card } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const BarriersPage = ({
  navigation,
  tempFormStyle,
  formData,
  setForm,
  nameString,
}) => {
  const { previous, next } = navigation;
  const { familyMember } = formData;
  const { TextArea } = Input;
  const options = [
    'Alcohol Abuse',
    'Developmental Disability',
    'Chronis Health Issues',
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
      <Card title="Barriers" bordered={false}>
        <Form.Item>
          <Button type="primary" htmlType="button" onClick={previous}>
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
              <Space>
                <p>{familyMember[mem].bearers.first_name}</p>
                <Row>
                  {options.map(barrier => (
                    <Col span={3} style={{ display: 'inline-block' }}>
                      <Form.Item label={barrier}>
                        <Checkbox
                          defaultChecked={
                            familyMember[mem].bearers[optionDataName[barrier]]
                          }
                          name={nameString(
                            mem,
                            `bearers.${optionDataName[barrier]}`
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
                  name={nameString(mem, 'bearers.list_issues')}
                  onChange={setForm}
                  value={familyMember[mem].bearers.list_issues}
                  autoSize={{ minRows: 3, maxRows: 5 }}
                ></TextArea>
              </Form.Item>
              <Form.Item label="Please list Indefinite Conditions for each family member (Alcohol Abuse, Developmental Disability, Chronic Health Issue, Mental Illness, ....)">
                <TextArea
                  name={nameString(mem, 'bearers.list_indefinite_conditions')}
                  onChange={setForm}
                  value={familyMember[mem].bearers.list_indefinite_conditions}
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
