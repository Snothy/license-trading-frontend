import React from 'react';
import { Card } from 'antd';

const { Meta } = Card;

class RoleCard extends React.Component {

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
            <Meta title={this.props.name} />
            <p>Description: {this.props.description}</p>
        </Card>
    );
  }
}

export default RoleCard; 