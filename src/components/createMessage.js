import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };

  
const message_contentRules = [
    { required: true, message: 'Input your message!', whitespace: true  }
];

class CreateChat extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext; //define user context for class
    
    onFinish = (values) => {
        const {...data } = values;
        const id = this.props.match.params.id;
        fetch(`https://opera-ski-3000.codio-box.uk/api/chats/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.user.token 
            }        
        })
        .then(status)
        .then(json)
        .then(data => {
            //alert("Message created")
            //console.log(data);
        })
        .catch(error => {
            alert("Creating message failed");
            console.log(error);
        });  
    };
    
    




    render() {
        return (
            <div className="chatMessage" onFinish={this.props.onFinish}>
            <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
                
                <Form.Item  name="message_content" label="Message" rules={message_contentRules} >
                    <Input />
                </Form.Item>    
                <Form.Item >
                    <Button onClick = {this.props.onClick} type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>

            </Form>
            </div>
        );
    };
};

export default withRouter(CreateChat);

/*
            <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
                
                <Form.Item  name="message_content" label="Message" rules={message_contentRules} >
                    <Input />
                </Form.Item>    
                <Form.Item >
                    <Button onClick = {this.handleClick} type="primary" htmlType="submit">
                        Send
                    </Button>
                </Form.Item>

            </Form>
*/