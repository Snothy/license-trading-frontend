import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const emailRules = [
    {type: 'email', message: 'Invalid email!'},
    {required: true, message: 'Input your email!' }
];

const passwordRules = [
    { required: true, message: 'Input your password!' }
];

const confirmRules = [
    { required: true, message: 'Confirm your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords dont match');
        }
    })
];

const usernameRules = [
    { required: true, message: 'Input your username!', whitespace: true }
]

const firstNameRules = [
    { required: true, message: 'Input your first name!', whitespace: true }
]

const lastNameRules = [
    { required: true, message: 'Input your last name!', whitespace: true }
]

class Register extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }
  
  onFinish = (values) => {
    const { confirm, ...data } = values;
    fetch('https://opera-ski-3000.codio-box.uk/api/users/register/', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("User created")
        console.log(data);
    })
    .catch(error => {
        alert("Creating user failed", error);
    });  
  };
  
  render() {
    return (
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
        
        <Form.Item name="email" label="Email" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
            <Input.Password />
        </Form.Item>

        <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
            hasFeedback rules={confirmRules}>
            <Input.Password />
        </Form.Item>

        <Form.Item name="username" label="Username" rules={usernameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="firstName" label="First Name" rules={firstNameRules} >
            <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name" rules={lastNameRules} >
            <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Register
            </Button>
        </Form.Item>
      </Form>
    );
  };
};

export default Register;