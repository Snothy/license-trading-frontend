import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import { withRouter } from "react-router";
import UserContext from '../contexts/user';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const emailRules = [
    {type: 'email', message: 'Invalid email!'},
    {required: false, message: 'Input your email!' }
];

const passwordRules = [
    { required: false, message: 'Input your password!' }
];


const usernameRules = [
    { required: false, message: 'Input your username!', whitespace: true }
]

const firstNameRules = [
    { required: false, message: 'Input your first name!', whitespace: true }
]

const lastNameRules = [
    { required: false, message: 'Input your last name!', whitespace: true }
]

class UpdateUser extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }

  static contextType = UserContext; //define user context for class
  
  onFinish = (values) => {
    const { ...data } = values;
    const id = this.props.match.params.id;
    fetch(`https://opera-ski-3000.codio-box.uk/api/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.context.user.token 
        }        
    })
    .then(status)
    .then(json)
    .then(data => {
        alert("User updated")
        console.log(data);
    })
    .catch(error => {
        alert("Updating user failed", error);
    });  
  };
  
  render() {
      const user = this.props.location.state.user;
      console.log(user);
    return (
        <>
        <h1>Insert data into the fields you wish to update</h1>
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError
      style={{ padding: '2% 20%' }} 
      initialValues = {{
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
      }}
      >
        
        <Form.Item name="email" label="Email" rules={emailRules} >
            <Input />
        </Form.Item>

        <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
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
      </>
    );
  };
};

export default withRouter(UpdateUser);