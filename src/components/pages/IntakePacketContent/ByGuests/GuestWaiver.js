import React from 'react';
import { Form, Input, Button } from 'antd';
import IntakeButton from '../IntakeButtons';
import { DatePicker } from 'antd';

export default class GuestWaiver extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
    };
  }

  handleFormLayoutChange = e => {
    this.setState({ formLayout: e.target.value });
  };
  render() {
    const { formLayout } = this.state;
    const formItemLayout =
      formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
        : null;
    const buttonItemLayout =
      formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : null;
    return (
      <div>
        <Form layout={formLayout}>
          <center>
            <h1>GUEST WAIVER OF LIABILITY AND DISCLAIMER</h1>
          </center>
          <center>
            <h1>(READ CAREFULLY BEFORE SIGNING)</h1>
          </center>
          <Form.Item label="I," {...formItemLayout}>
            <Input placeholder="" />
            <p>
              , hereby acknowledge and agree to the terms of Family Promise Open
              Doors Shelter, 2002 E Mission Ave, Spokane, WA 99202
            </p>
            <p>
              I am at least (18) years of age{' '}
              <heavy>(if under 18, parental consent needed)</heavy> and legally
              competent to sign this Waiver of Liability and Disclaimer
              ("Waiver").
            </p>
            <p>
              I DO HEREBY EXEMPT AND RELEASE FAMILY PROMISE, ITS OFFICERS,
              DIRECTORS, EMPLOYEES, VOLUNTEERS, CONTRACTORS, STAFF, AFFILIATES,
              AGENTS, AND ATTORNEYS (COLLECTIVELY, THE "RELEASED PERSONS") FROM
              ANY AND ALL LIABILITY WHATSOEVER FOR PERSONAL INJURY, PROPERTY
              DAMAGE, OR WRONGFUL DEATH CAUSED BY THE ACTS OR OMMISSIONS OF ANY
              ONE OR MORE OF THE RELEASED PERSONS AND/OR AND THIRD PARTIES
              ARISING OUT OF THE PROJECT, WORK ASSOCIATED WITH THE PROJECT, OR
              MY PARTICIPATION IN THE PROJECT.
            </p>
            <p>
              I FURTHER HEREBY ACKNOWLEDGE AND AGREE TO DEFEND, INDEMNIFY, SAVE,
              HOLD HARMLESS, ANDCOVENANT NOT TO SUE THE RELEASED PERSONS FOR ANY
              AND ALL CLAIMS, DEMANDS, DAMAGES, CAUSES OF ACTIONAND SUITS IN
              EQUITY, WHETHER ARISING OUT OF COMMON LAW, EQUITY, ARBITRATION OR
              STATUTE, NOW ORHEREAFTER ARISING, KNOWN OR UNKNOWN, ASSERTED BY
              ME, MY CHILD, OR MY SPOUSE (AND MY OR THEIRRESPECTIVE ESTATES,
              HEIRS, EXECUTORS, ADMINISTRATORS, OR ASSIGNS) ARISING SOLELY OUT
              OF MY ACTS OROMISSIONS THAT OCCURRED DURING THE PROJECT, WORK
              ASSOCIATED WITH THE PROJECT, OR MY PARTICIPATION IN THE PROJECT.
            </p>
            <p>
              I hereby acknowledge and expressly agree that all indemnities,
              releases and waivers contained in this Waiver areintended to be as
              broad and inclusive as permitted by the laws of the State of
              Washington and that, if any portion of the agreements inthis
              Waiver are held invalid, it is agreed that the balance shall,
              notwithstanding, continue in full legal force and effect.I
              understand the terms herein are contractual and not merely
              recitals, and that I have signed this document of my own free
              will.
            </p>
            <center>
              <h2>
                <heavy>
                  I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS WAIVER BY
                  READING IT BEFORE I SIGNED IT.
                </heavy>
              </h2>
            </center>
            <h2>
              <heavy>**MUST BE SIGNED BY ALL ADULTS IN HOUSEHOLD**</heavy>
            </h2>
          </Form.Item>
          <Form.Item label="Client Signature:" {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Date:" {...formItemLayout}>
            <DatePicker />
          </Form.Item>

          <Form.Item label="Client Signature:" {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="Date:" {...formItemLayout}>
            <DatePicker />
          </Form.Item>
          <p>
            <heavy>Name(s) and Age(s) of Child(ren) in my household:</heavy>
          </p>
          <Form.Item label="1." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="2." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="3." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="4." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="5." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label="6." {...formItemLayout}>
            <Input placeholder="" />
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
