import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import UserSwitchOutlined from '@ant-design/icons/UserSwitchOutlined';
import { Icon } from 'antd';
import { withRouter } from "react-router";

const { Meta } = Card;

class UserCard extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    return (<Link to="update"></Link>)
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    const Icon = UserSwitchOutlined
    const id = this.props.match.params.id;
    //console.log(this.props);
    return (
            <Card
                style={{ width: 450 }}
                hoverable={true}
            
                actions={[
                    <Link to = {{pathname: `/users/${id}/update`, state:{
                        user: {
                            username: this.props.username,
                            lastName: this.props.lastName,
                            firstName: this.props.firstName,
                            email: this.props.email
                        }
                    }}}>
                    <Icon onClick={this.onClick}/>
                    </Link>
                  ]}
                  >

                <Meta title={this.props.username} />
                <p>First Name: {this.props.firstName}</p>
                <p>Last Name: {this.props.lastName}</p>
                <p>Email: {this.props.email}</p>
                <p>Registration date: {this.props.dateRegistered}</p>
            </Card>
    );
  }
}

export default withRouter(UserCard); 