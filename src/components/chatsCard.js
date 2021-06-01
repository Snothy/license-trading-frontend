import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";

const { Meta } = Card;

class ChatsCard extends React.Component {

  constructor(props) {
    super(props);
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    return (
        <Link to = {`chats/${this.props.chat_ID}`} >
            <Card
                style={{ width: 450 }}
                hoverable={true}>
                <p>User: {this.props.firstName} {this.props.lastName}</p>
                <p>{this.props.last_message}</p>
            </Card>
        </Link>
    );
  }
}

export default ChatsCard; 