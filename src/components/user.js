import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import UserCard from './userCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            user: []
        }

    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        const id = this.props.match.params.id; //using withRouter, as useParams cannot be used within a class component
        //let { ID } = useParams();
        fetch(`https://opera-ski-3000.codio-box.uk/api/users/${id}`, {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(this.props.match.params);
            this.setState({ user: [data] });
            //console.log(this.state.user);
            //console.log(data);
        })
        .catch(err => {
            if (err.status === 404) {
                this.setState( {noneFound: true});
            }
            console.log("Error fetching user", err);
        });
      }
  
    render() {
        if (this.state.noneFound === true) {
            return <h3>User not found.</h3> 
        }
        if (!this.state.user.length) {
            return <h3>Loading user...</h3>
        }
        return (
            <div style={{padding:"15px"}} key={this.state.user.ID}>
                <Col span={4}>
                    <Row type="flex" justify="space-around">
                    <UserCard {...this.state.user[0]}/>
                    </Row>
                </Col>
            </div>
        );
    }
}
  
export default withRouter(User);
