import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const nameRules = [
    {required: true, message: 'Input your company name!', whitespace: true }
];

const descriptionRules = [
    { required: true, message: 'Input your address!', whitespace: true  }
];

class CreateRole extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext; //define user context for class
    
    onFinish = (values) => {
        const {...data } = values;
        fetch('https://opera-ski-3000.codio-box.uk/api/roles/', {
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
            alert("Role created")
            //console.log(data);
        })
        .catch(error => {
            alert("Creating role failed");
            //console.log(error);
        });  
    };
    
    

    



    render() {



        return (
        <>
        <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
            
            <Form.Item name="name" label="Role name" rules={nameRules} >
                <Input />
            </Form.Item>

            <Form.Item name="description" label="Description" rules={descriptionRules}  >
                <Input />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Create Role
                </Button>
            </Form.Item>
        </Form>
        </>
        );
    };
};

export default CreateRole;
