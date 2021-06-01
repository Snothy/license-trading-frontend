import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import UsersCard from './usersCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/users', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            this.setState({ users: data });
        })
        .catch(err => {
            console.log("Error fetching users", err);
        });
      }
  
    render() {
        if (!this.state.users.length) {
            return <h3>Loading users...</h3>
        }
        const cardList = this.state.users.map(user => {
            return (
            <div style={{padding:"15px"}} key={user.ID}>
                <Col span={4}>
                <UsersCard {...user} />
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
  
    export default Users;
