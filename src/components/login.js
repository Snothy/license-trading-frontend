import React from 'react';
import { Form, Input, Button } from 'antd';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';

import { status, json } from '../utilities/requestHandlers';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const passwordRules = [
    { required: true, message: 'Please input your password!' }
];

const usernameRules = [
    { required: true, message: 'Please input your username!', whitespace: true }
]

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    state = {redirect: null}

    static contextType = UserContext;

    login(values) {
        const {username, password} = values;
        console.log(`${username}`)
        fetch('https://opera-ski-3000.codio-box.uk/api/users/login', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
                "username" : username,
                "password" : password
            })
        })
        .then(status)
        .then(json)
        .then(user => {
            console.log('Logged in.');
            //console.log(user);
            //user.password = password;
            this.context.login(user);
            this.setState({redirect:'/'});
        })
        .catch(error => {
            console.log("Could not Log in");
        });  
    }
    
  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }    
    return (
        <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
            <Form.Item name="username" label="Username" rules={usernameRules} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
  };
};

export default LoginForm;