import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

class RolesCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    return (
        <Link to = {`roles/${this.props.ID}`} >
            <Card
                style={{ width: 450 }}
                hoverable={true}>
                <Meta title={this.props.name} />
                <p>Description: {this.props.description}</p>
            </Card>
        </Link>
    );
  }
}

export default RolesCard; 