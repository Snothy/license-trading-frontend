import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

class ApplicationCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    const applicationID = this.props.ID;
    return (
        <Link to = {`applications/${this.props.ID}`} >
            <Card
                style={{ width: 450 }}
                hoverable={true}>
                <Meta title={this.props.company_name} phone_number = {this.props.telephone_number} status = {this.props.status} />
                <p>Address: {this.props.address}</p>
                <p>Contact: {this.props.telephone_number}</p>
                <p>Status: {this.props.status}</p>
            </Card>
        </Link>
    );
  }
}

export default ApplicationCard; 