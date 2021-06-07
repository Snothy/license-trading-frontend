import React from 'react';
import { Row, Col } from 'antd';
import PendingChatsCard from './pendingChatsCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import {errorHandler} from '../utilities/errorHandler';

class PendingChats extends React.Component {

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
        fetch('https://opera-ski-3000.codio-box.uk/api/chats/pending', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //Can't get response status code here, so the check is done in the .catch error handler
            //console.log(data);
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
            //run the handler passed in by the parent component
            //console.log(prevState.isSubmitted);
            //console.log('b');
            //console.log(this.state.isSubmitted)
            //this.props.handleToggle(this.state.selected);
            //this.setState( {isRendered: true});
            //console.log(prevProps);
            //console.log(prevState);
            //console.log(this.state);
            this.setState({isRendered: true});
            //console.log(this.state.chats);
            // eslint-disable-next-line
            this.state.chats = this.state.chats.filter(chat =>{
                return chat.chat_ID !== this.state.chatId; //remove chat that had its status changed from the list so it gets unrendered
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
        if (this.state.noneFound === true) {
            return(
            <>
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
                {this.state.isRendered ?<PendingChatsCard isNotRendered={this.handleRender} {...chat} />: null}
                </Col>
            </div>
            )
        });
        return (
            <>

                <Row type="flex" justify="space-around">
                    {cardList}
                </Row>
            </>
        );
    }
}
  
export default PendingChats;
