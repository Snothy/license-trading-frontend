import React from 'react';
import { Card } from 'antd';
//import { Link } from "react-router-dom";

const { Meta } = Card;

class ChatCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    //console.log(this.props);
    return (
        <Card
            style={{ width: 450 }}
            hoverable={true}>
            <Meta title={this.props.username} />
            <p>Address: {this.props.message_content}</p>
            <p>Contact: {this.props.date_sent}</p>
        </Card>
    )

  }
}

export default ChatCard; 