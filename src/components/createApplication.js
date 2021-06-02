import React from 'react';
import {Upload, message, Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import Uploader from './uploader';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const companyNameRules = [
    {required: true, message: 'Input your company name!', whitespace: true }
];

const addressRules = [
    { required: true, message: 'Input your address!', whitespace: true  }
];

const postcodeRules = [
    { required: true, message: 'Input your postcode!', whitespace: true }
]

const telephoneNumberRules = [
    { required: true, message: 'Input your telephone number!', whitespace: true }
]

const insuranceCompanyRules = [
    { required: true, message: 'Input your insurance company!', whitespace: true }
]

class CreateApplication extends React.Component {

    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext; //define user context for class
    
    onFinish = (values) => {
        const {...data } = values;
        fetch('https://opera-ski-3000.codio-box.uk/api/applications/', {
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
            alert("Application created")
            //console.log(data);
        })
        .catch(error => {
            alert("Creating application failed");
            //console.log(error);
        });  
    };
    
    

    



    render() {



        return (
        <>
        <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
            
            <Form.Item name="company_name" label="Company name" rules={companyNameRules} >
                <Input />
            </Form.Item>

            <Form.Item name="address" label="Address" rules={addressRules}  >
                <Input />
            </Form.Item>

            <Form.Item name="postcode" label="Postcode" rules={postcodeRules} >
                <Input />
            </Form.Item>

            <Form.Item name="telephone_number" label="Telephone Number" rules={telephoneNumberRules} >
                <Input />
            </Form.Item>

            <Form.Item name="insurance_company" label="Insurance Company" rules={insuranceCompanyRules} >
                <Input />
            </Form.Item>
            

            <Uploader />





        </Form>
        </>
        );
    };
};

export default CreateApplication;
