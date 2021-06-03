import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import ChatsCard from './chatsCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';


class Chats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound : 0,
            chats: []
        }
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/chats', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //Can't get response status code here, so the check is done in the .catch error handler
            this.setState({ chats: data });
            //console.log(data);
        })
        .catch(err => {
            if (err.status === 404) {
                this.setState( {noneFound: true});
            }
            console.log("Error fetching chats", err);
        });
      }
  
    render() {
        let createButton, pendingButton;
        if (this.context.user.isAdmin || this.context.user.isStaff) {
            pendingButton = (
            <>
                <Button type="primary" >
                    <Link to="/chats/pending">Pending Chats</Link>  
                </Button>
            </>
            )
        }
        createButton = (
            <Button type="primary" >
                <Link to="/chats/create">Create Chat</Link>  
            </Button>
        )

        if (this.state.noneFound === true) {
            return(
            <>
                {createButton}
                {pendingButton}
            
                <h3>No chats found.</h3>
            </>
            )

        }
        //console.log(!this.state.chats.length)
        if (!this.state.chats.length) {
            return <h3>Loading chats...</h3>
        }
        const cardList = this.state.chats.map(chat => {
            return (
            <div style={{padding:"15px"}} key={chat.chat_ID}>
                <Col span={4}>
                <ChatsCard {...chat} />
                </Col>
            </div>
            )
        });
        return (
            <>
                {createButton}
                {pendingButton}

                <Row type="flex" justify="space-around">
                    {cardList}
                </Row>
            </>
        );
    }
}
  
export default Chats;
