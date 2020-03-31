import React from 'react';
import { Form, Input, Button, Checkbox, Modal, Col, Row, Select } from 'antd';
import { Redirect } from 'react-router-dom';
import Parse from 'parse';
import loginController from './loginController';

const LogInView = () => {
  const {
    onSignIn,
    onSignUp,
    data,
    showSignUpForm,
    setTextFieldsValue,
    setRole,
  } = loginController();

  const { Option } = Select;

  const signInLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const signInTailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const RegistrationForm = () => {
    const [form] = Form.useForm();
  };
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  return (
    <div style={{ margin: '10vw' }}>
      <div>{Parse.User.current() && <Redirect to="/user" />}</div>
      <Form
        hideRequiredMark={false}
        initialValues={{
          remember: true,
        }}
        {...signInLayout}
        name="basic"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            value={data.userName}
            style={{ width: '25vw' }}
            onChange={e => setTextFieldsValue('userName', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            value={data.passWord}
            style={{ width: '25vw' }}
            onChange={e => setTextFieldsValue('passWord', e.target.value)}
          />
        </Form.Item>

        <Form.Item
          {...signInTailLayout}
          name="remember"
          valuePropName="checked"
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...signInTailLayout}>
          <Button type="primary" htmlType="submit" onClick={() => onSignIn()}>
            LogIn
          </Button>
          <Button onClick={() => showSignUpForm()}>create</Button>
          <div style={{ marginTop: 20 }}>
            <a>Forgot Password</a>
          </div>
        </Form.Item>
      </Form>
      <Modal
        centered={true}
        width={'35%'}
        title="Create Account"
        visible={data.signUpFormVisible}
      >
        <Form
          {...formItemLayout}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              prefix={'+98'}
              style={{
                width: '100%',
              }}
              onChange={e => setTextFieldsValue('phoneNumber', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="name"
            label="Name"
            value={data.userFistName}
            rules={[
              {
                required: true,
                message: 'Please input your name!',
              },
            ]}
          >
            <Input
              onChange={e => setTextFieldsValue('firstName', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="lastname"
            label="Last Name"
            value={data.userLastName}
            rules={[
              {
                required: true,
                message: 'Please input your last name!',
              },
            ]}
          >
            <Input
              onChange={e => setTextFieldsValue('lastName', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="Role"
            rules={[
              {
                required: true,
                message: 'Please select your role!',
              },
            ]}
          >
            <Select
              size={'large'}
              style={{ width: 200 }}
              placeholder="Select yor role"
              onChange={value => setRole(value)}
            >
              <Option value="lawyer">Lawyer</Option>
              <Option value="user">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              onChange={e => setTextFieldsValue('email', e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    'The two passwords that your entered do not match!',
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject('Should accept agreement'),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" onClick={() => onSignUp()}>
              Create account
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LogInView;
