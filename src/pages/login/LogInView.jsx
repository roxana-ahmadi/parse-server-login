import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Redirect } from 'react-router-dom';

import logincontroller from './logincontroller';

const LogInView = () => {
  const {
    onSignIn,
    onSignUp,
    getUserName,
    getPassWord,
    data,
  } = logincontroller();
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  return (
    <div style={{ margin: '10vw' }}>
      <div>{data.isAuthenticated && <Redirect to="/user" />}</div>
      <Form
        hideRequiredMark={false}
        initialValues={{
          remember: true,
        }}
        {...layout}
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
            onChange={e => getUserName(e.target.value)}
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
            onChange={e => getPassWord(e.target.value)}
          />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={() => onSignIn()}>
            LogIn
          </Button>
          <Button onClick={() => onSignUp()}>create</Button>
          <div style={{ marginTop: 20 }}>
            <a>Forgot Password</a>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LogInView;
