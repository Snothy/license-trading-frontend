import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import { Link } from "react-router-dom";
import ChatsCard from './chatsCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import {errorHandler} from '../utilities/errorHandler';


class Chats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound : 0,
            chats: [],
            isRendered: true,
            chatId: "",
            error: false,
            errorMsg: ""
        }
        this.handleRender = this.handleRender.bind(this);
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
            const error = errorHandler(err);
            if(error[0] === true) {
                this.setState({error: error[1].error});
                this.setState({errorMsg: error[1].errorMsg})
            }
        });
      }

      
      componentDidUpdate(prevProps, prevState){
        if (prevState.isRendered !== this.state.isRendered) {
            this.setState({isRendered: true});
            console.log(this.state.chats);
            this.state.chats = this.state.chats.filter(chat =>{
                return chat.chat_ID !== this.state.chatId; 
            })
          }
      }

      handleRender(id) {
        this.setState({isRendered: false});
        this.setState({chatId : id});
      }
  
    render() {
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
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
                {this.state.isRendered ?<ChatsCard isNotRendered={this.handleRender} {...chat} />: null}
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
