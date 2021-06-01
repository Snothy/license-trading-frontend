import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

class UsersCard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <Link to = {`users/${this.props.ID}`} >
            <Card
                style={{ width: 450 }}
                hoverable={true}>
                <Meta title={this.props.username} />
                <p>First name: {this.props.firstName}</p>
                <p>Last name: {this.props.lastName}</p>
                <p>Email: {this.props.email}</p>
            </Card>
        </Link>
    );
  }
}

export default UsersCard; 