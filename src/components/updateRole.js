import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

const nameRules = [
    {required: false, message: 'Input your company name!', whitespace: true }
];

const descriptionRules = [
    { required: false, message: 'Input your address!', whitespace: true  }
];

class UpdateRole extends React.Component {

    constructor(props) {
        super(props);
        //this.location = props.useLocation();
        this.onFinish = this.onFinish.bind(this);
    }

    static contextType = UserContext; //define user context for class
    
    onFinish = (values) => {
        const id = this.props.match.params.id;
        const {...data } = values;
        fetch(`https://opera-ski-3000.codio-box.uk/api/roles/${id}`, {
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
            alert("Role updated")
            //console.log(data);
        })
        .catch(error => {
            alert("Upadting role failed");
            //console.log(error);
        });  
    };
    
    

    



    render() {
        //console.log(this.props);
        //console.log(this.props.location.state);
        const role = this.props.location.state.role;
        //console.log(this.props);
        //const role = this.props.location.state.role; //role passed into the "to" of the Link component as a state 
        //console.log(this.props.location.state.role[0]);
        return (
        <>
        <Form {...formItemLayout}
            initialValues ={{
                name: role.name,
                description: role.description
            }}
            name="register" onFinish={this.onFinish} scrollToFirstError >
            
            <Form.Item name="name" label="Role name" rules={nameRules} >
                <Input/>
            </Form.Item>

            <Form.Item name="description" label="Description" rules={descriptionRules}  >
                <Input />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Update Role
                </Button>
            </Form.Item>
        </Form>
        </>
        );
    };
};

export default withRouter(UpdateRole);
