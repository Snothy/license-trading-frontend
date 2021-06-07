import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import PendingChatsCardIcon from './pendingChatsCardIcon';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class PendingChatsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selected: false //setting it as a state is fine, as the chat will not be there upon re-render 
      };
      this.toggleStatusAccepted = this.toggleStatusAccepted.bind(this); //accessing 'this' inside the function

    //this.toggleLike = this.toggleLike.bind(this);
    //this.togglePinned = this.togglePinned.bind(this);
  }

  static contextType = UserContext; //define user context for class

  toggleStatusAccepted() {
    //console.log(this.props.chat_ID);
    this.props.isNotRendered(this.props.chat_ID); //give the current chat id so it can get removed from the state list
    //this.props.isNotRendered();
    //Request to change status
    //console.log(this.props);
    const data = { chat_ID: this.props.chat_ID, status: 2 };
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
    .then(data => {
        //console.log(data.ID);
        
    })

    .catch(err => {
        console.log("Error updating status", err);
    });
  }

  //implement the status as an image?
  render() {
    //console.log(this.props);
    return (
            <Card
                style={{ width: 450 }}
                hoverable={true}
                actions={[
                    <PendingChatsCardIcon type={this.props.status}
                     id={this.props.chat_ID}/>,
                    <PendingChatsCardIcon type="changeStatus"
                        handleToggle={this.toggleStatusAccepted} id={this.props.chat_ID} selected={this.state.selected}/>
                  ]}>
                <p>User: {this.props.firstName} {this.props.lastName}
                <Link to={`chats/${this.props.chat_ID}`} />
                </p>
                <p>{this.props.last_message}</p>
            </Card>
    );
  }
}

export default PendingChatsCard; 