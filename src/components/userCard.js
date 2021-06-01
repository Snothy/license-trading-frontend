import React from 'react';
import { Card } from 'antd';
//import { Link } from "react-router-dom";

const { Meta } = Card;

class UserCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    return (
            <Card
                style={{ width: 450 }}
                hoverable={true}>
                <Meta title={this.props.username} />
                <p>First Name: {this.props.firstName}</p>
                <p>Last Name: {this.props.lastName}</p>
                <p>Email: {this.props.email}</p>
                <p>Registration date: {this.props.dateRegistered}</p>
            </Card>
    );
  }
}

export default UserCard; 