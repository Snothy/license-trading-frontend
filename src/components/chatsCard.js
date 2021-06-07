import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import ChatsCardIcon from './chatsCardIcon';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class ChatsCard extends React.Component {

  constructor(props) {
    super(props);
    //this.toggleLike = this.toggleLike.bind(this);
    this.toggleStatusResolved = this.toggleStatusResolved.bind(this);
  }


  static contextType = UserContext; //define user context for class
  
  toggleStatusResolved() {
    //this.setState( {selected: true} );
    this.props.isNotRendered(this.props.chat_ID);
    //Request to change status
    //console.log(this.props);
    const data = {chat_ID: this.props.chat_ID, status: 3};
    //console.log(JSON.stringify(data));
    fetch('https://opera-ski-3000.codio-box.uk/api/chats/pending', {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.context.user.token 
        } 
    })
    .then(status)
    .then(json)
    .catch(err => {
        console.log("Error updating status", err);
    });
  }

  //implement the status as an image?
  render() {

    //console.log(this.props.status);
    return (

            <Card
                style={{ width: 450 }}
                hoverable={true}
                actions={[
                    <ChatsCardIcon type={this.props.status}
                        id={this.props.chat_ID}/>,
                    <ChatsCardIcon type='statusResolved'
                        handleToggle={this.toggleStatusResolved} id={this.props.chat_ID}/>,
                  ]}>
                                <Link to = {`chats/${this.props.chat_ID}`} >
                <p>User: {this.props.firstName} {this.props.lastName}</p>
                <p>{this.props.last_message}</p>
                </Link>
            </Card>
           
    );
  }
}

export default ChatsCard; 