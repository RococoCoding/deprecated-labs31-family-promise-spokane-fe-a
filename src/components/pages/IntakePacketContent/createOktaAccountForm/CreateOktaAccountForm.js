import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const okta_register_url =
  'https://dev-2240040.okta.com/api/v1/registration/reg2labm2m2Z3iPh05d6/register';
const okta_activate_url = 'https://dev-2240040.okta.com/api/v1/authn';

const CreateOktaAccountForm = ({ setUserId }) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

  const createOktaAccount = async values => {
    setLoading(true);

    const profileObj = {
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    };

    try {
      const activationToken = await axios
        .post(okta_register_url, { userProfile: profileObj })
        .then(res => res.data.activationToken);
      const userId = await axios
        .post(okta_activate_url, { token: activationToken })
        .then(res => res.data._embedded.user.id);
      setUserId(userId);
    } catch (error) {
      setErrors(error.response?.data?.errorCauses[0]?.errorSummary);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = values => {
    createOktaAccount(values);
  };

  const clearErrors = () => {
    if (errors) {
      setErrors(null);
    }
  };

  return (
    <div className="okta-form-container">
      <div className="okta-form">
        <h1>Create guest account</h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onChange={clearErrors}
        >
          <Form.Item
            name="firstName"
            initialValue={'Mary'}
            rules={[
              { required: true, message: 'Please input your first name!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First name"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            initialValue={'Poppins'}
            rules={[
              { required: true, message: 'Please input your last name!' },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last name"
            />
          </Form.Item>

          <Form.Item
            name="email"
            initialValue={'mpoppins@gmail.com'}
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            initialValue={'testpassword'}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={loading ? true : false}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {loading ? 'Loading. . .' : 'Submit'}
            </Button>
          </Form.Item>
          {errors && <p>{errors}</p>}
        </Form>
      </div>
    </div>
  );
};

export default CreateOktaAccountForm;
