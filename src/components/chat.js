import React, { useContext } from 'react';
import { Row, Col, Card, Form, Button, Input } from 'antd';
import ChatsCard from './chatCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import CreateMessage from './createMessage';

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };

const message_contentRules = [
    { required: true, message: 'Input your message!', whitespace: true  }
];


class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            chat: []
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
            if (err.status === 404) {
                this.setState( {noneFound: true});
            } else if (err.status === 403) { // FIX ERROR HANDLING PLS this is forbidden (no access)
                this.setState( {noneFound: true})
            }
            console.log("Error fetching chat", err);
        });
      }

      onFinish = (values) => {
        const {...data } = values;
        const id = this.props.match.params.id;
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
            console.log(data);
            //this.setState( {chat: data} )
        })
        .catch(error => {
            alert("Creating message failed");
            console.log(error);
        });  
    };

    handleClick = () => {
        // force a re-render
        this.forceUpdate();
      };
  
      render() {
          let chatMessage;
          chatMessage = (
            <div>
                <Form {...formItemLayout} name="register" onFinish={this.onFinish} scrollToFirstError >
                    
                    <Form.Item  name="message_content" label="Message" rules={message_contentRules} >
                        <Input />
                    </Form.Item>    
                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Send
                        </Button>
                    </Form.Item>
                </Form>
            </div>
          )
          console.log(this.state.chat);
        if (this.state.noneFound === true) {
            return <Card>
                <>
                    <p>No messages.</p>
                    {chatMessage}
                </>
            </Card>
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




















/*
import React, { useContext } from 'react';
import { Row, Col, Card, Form, Button } from 'antd';
import ChatsCard from './chatCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import CreateMessage from './createMessage';


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

      handleClick = () => {
        //Force a re-render.
        this.forceUpdate();
      };

  
      render() {
        if (this.state.noneFound === true) {
            return <Card>
                <>
                    <p>No messages.</p>
                    <CreateMessage />
                </>
            </Card>
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
            <>
            <Row type="flex" justify="space-around">
                <Card
                style={{ width: 750 }}
                hoverable={true}>
                    {cardList}

                    <CreateMessage onClick = {this.handleClick} />

                </Card>
            </Row>

            </>
        );
    }
}
  
export default withRouter(Chat);
*/