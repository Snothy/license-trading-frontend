import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import ChatsCard from './chatCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            chat: []
        }

    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        const id = this.props.match.params.id; //using withRouter, as useParams cannot be used within a class component
        //let { ID } = useParams();
        fetch(`https://opera-ski-3000.codio-box.uk/api/chats/${id}`, {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(this.props.match.params);
            this.setState({ chat: data });
            //console.log(this.state.user);
            //console.log(data);
        })
        .catch(err => {
            if (err.status === 404) {
                this.setState( {noneFound: true});
            } else if (err.status === 403) { // FIX ERROR HANDLING PLS this is forbidden (no access)
                this.setState( {noneFound: true})
            }
            console.log("Error fetching chat", err);
        });
      }
  
      render() {
        if (this.state.noneFound === true) {
            return <h3>No chat found.</h3> 
        }
        //console.log(!this.state.chats.length)
        if (!this.state.chat.length) {
            return <h3>Loading chat...</h3>
        }
        const cardList = this.state.chat.map(message => {
            return (
            <div style={{padding:"15px"}} key={message.ID}>
                <Col span={4}>
                    <ChatsCard {...message} />
                </Col>
            </div>
            )
        });
        return (
            <Row type="flex" justify="space-around">
                {cardList}
            </Row>
        );
    }
}
  
export default withRouter(Chat);
