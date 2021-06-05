import React, { useContext } from 'react';
import { Row, Col, Card, Form, Button, Input } from 'antd';
import ChatCard from './chatCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import {errorHandler} from '../utilities/errorHandler';
//import CreateMessage from './createMessage';

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };

const message_contentRules = [
    { required: false, message: 'Input your message!', whitespace: true  }
];


class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: false,
            chat: [],
            isSubmitted: false,
            value: "",
            error: false,
            errorMsg: ""
        }
        this.onFinish = this.onFinish.bind(this);
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
            const error = errorHandler(err);
            if(error[0] === true) {
                this.setState({error: error[1].error});
                this.setState({errorMsg: error[1].errorMsg})
            }
            //console.log(error);
            if(err.status === 404) {
                this.setState({noneFound: true});
            }
        });
      }


      componentDidUpdate(prevProps, prevState){
        if (prevState.isSubmitted !== this.state.isSubmitted) {
            //run the handler passed in by the parent component
            //console.log(prevState.isSubmitted);
            //console.log('b');
            //console.log(this.state.isSubmitted)
            //this.props.handleToggle(this.state.selected);
            this.setState( {isSubmitted: false});
          }
      }

      onFinish = (values) => {
        const {...data } = values;
        const id = this.props.match.params.id;
        this.setState({noneFound: false});
        fetch(`https://opera-ski-3000.codio-box.uk/api/chats/${id}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.user.token 
            }        
        })
        .then(status)
        .then(json)
        .then(data => {
            //alert("Message created")
            //console.log(data);
           this.state.chat.push(data.chatMessage[0]);
            this.setState( { isSubmitted: true } );
        })
        .catch(error => {
            alert("Creating message failed");
            console.log(error);
        });  
    };


  
      render() {
        //console.log(this.state.chat.slice(-1)[0]);
          //const formRef = React.createRef();
          console.log(this.state.chat);
          console.log(!this.state.chat.length);
          let chatMessage;
          //New chat messages appear dynamically because of the of the change of state
          //Upon submitting, the stat.chat get updated with the new message and state.isSubmitted is true
          //if state.isSubmitted is true, i render a new ChatCard that dispalys the message
          //Then thanks to componentDidUpdate, the state gets reverted back to false, awaiting a new message
            chatMessage = (
                <div>
                    <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
                        
                        <Form.Item name="message_content" label="Message" rules={message_contentRules} >
                            <Input />
                        </Form.Item>    
                        <Form.Item >
                            <Button
                                type="primary" htmlType="submit">
                                Send
                            </Button>
                        </Form.Item>
                    </Form>
                    {this.state.isSubmitted ?
                    <ChatCard {...this.state.chat.slice(-1)[0]} /> :
                    null
                        }
                </div>
            )
            const cardList = this.state.chat.map(message => {
                return (
                <div style={{padding:"15px"}} key={message.ID}>
                    <Col span={4}>
                        <ChatCard {...message} />
                    </Col>
                </div>
                )
            });
          //console.log(this.state.chat);
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (this.state.noneFound === true) {
            return (
            <Card>
                    <p>No messages.</p>
                    {cardList}
                    {chatMessage}
            </Card>
            )}
        //console.log(!this.state.chats.length)
        if (!this.state.chat.length) {
            return <h3>Loading chat...</h3>
        }

        return (
            <>
            <Row type="flex" justify="space-around">
                <Card
                style={{ width: 750 }}
                hoverable={true}>
                    {cardList}
                    {chatMessage}

                </Card>
            </Row>
            </>
        );
    }
}
  
export default withRouter(Chat);

