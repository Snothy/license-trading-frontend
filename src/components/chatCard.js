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
      /*
    this.props.map((msg) => {
        const t = msg.date_sent.split(/[- :]/);;
        msg.date_sent = new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    })
    */

    const newDate = new Date(Date.parse(this.props.date_sent));
    //console.log(newDate.toUTCString());
    const name = this.props.firstName//.concat(" ").concat(this.props.lastName)
    return (
        <>
            <Meta title= {name} />
            <p style={{ width: 750 }}>{this.props.message_content}</p>
            <p style={{ width: 500 }}>{newDate.toUTCString()}</p>
        </>
    )

  }
}

export default ChatCard; 