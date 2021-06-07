import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import UserCard from './userCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import {errorHandler} from '../utilities/errorHandler';
import { Link } from "react-router-dom";

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            user: [],
            error: false,
            errorMsg: ""
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
            const error = errorHandler(err);
            if(error[0] === true) {
                this.setState({error: error[1].error});
                this.setState({errorMsg: error[1].errorMsg})
            }
            if (err.status === 404) {
                this.setState( {noneFound: true});
            }
        });
      }
  
    render() {
        console.log(this.state.user[0]);
        let manageRoles;
        const id = this.props.match.params.id;
        if(this.context.user.isAdmin) {
            manageRoles = (
                <>
                <Button type="primary" >
                    <Link to={{pathname: `/users/${id}/roles`}}>Manage Roles</Link>  
                </Button>
                </>
            )}
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (this.state.noneFound === true) {
            return <h3>User not found.</h3> 
        }
        if (!this.state.user.length) {
            return <h3>Loading user...</h3>
        }
        return (
            <div style={{padding:"15px"}} key={this.state.user.ID}>
                {manageRoles}
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
