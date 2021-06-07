import React from 'react';
import { Row, Col, Button } from 'antd';
import RoleCard from './roleCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import {errorHandler} from '../utilities/errorHandler';

class Role extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            role: [],
            error: false,
            errorMsg: ""
        }

    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        const id = this.props.match.params.id; //using withRouter, as useParams cannot be used within a class component
        //let { ID } = useParams();
        fetch(`https://opera-ski-3000.codio-box.uk/api/roles/${id}`, {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(this.props.match.params);
            this.setState({ role: [data] });
            //console.log(this.state.user);
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
  
      render() {
          //console.log(this.state.role[0]);
        const id = this.props.match.params.id;
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (this.state.noneFound === true) {
            return <h3>No role found.</h3> 
        }
        //console.log(!this.state.chats.length)
        if (!this.state.role.length) {
            return <h3>Loading role...</h3>
        }
        return (
            <div style={{padding:"15px"}} key={this.state.role.ID}>
                <Button type="primary" >
                    <Link to={{ pathname: `/roles/${id}/update`, state:{
                        role: this.state.role[0]
                        } }}>Update Role</Link>  
                </Button>
                <Col span={4}>
                    <Row type="flex" justify="space-around">
                    <RoleCard {...this.state.role[0]}/>
                    </Row>
                </Col>
            </div>
        );
    }
}
  
export default withRouter(Role);
