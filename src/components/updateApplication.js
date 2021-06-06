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
const companyNameRules = [
    {required: false, message: 'Input your company name!', whitespace: true }
];

const addressRules = [
    { required: false, message: 'Input your address!', whitespace: true  }
];

const postcodeRules = [
    { required: false, message: 'Input your postcode!', whitespace: true }
]

const telephoneNumberRules = [
    { required: false, message: 'Input your telephone number!', whitespace: true }
]

const insuranceCompanyRules = [
    { required: false, message: 'Input your insurance company!', whitespace: true }
]

class UpdateApplication extends React.Component {

  constructor(props) {
      super(props);
      this.onFinish = this.onFinish.bind(this);
  }

  static contextType = UserContext; //define user context for class
  
  onFinish = (values) => {
    const { ...data } = values;
    console.log(values);
    const id = this.props.match.params.id;
    fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${id}`, {
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
        alert("Application updated")
        //console.log(data);
    })
    .catch(error => {
        alert("Updating application failed", error);
    });  
  };
  
  render() {
    return (
        <>
        <h1>Insert data into the fields you wish to update</h1>
      <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError
      style={{ padding: '2% 20%' }} >
        
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

        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Confirm Update
            </Button>
        </Form.Item>
      </Form>
      </>
    );
  };
};

export default withRouter(UpdateApplication);