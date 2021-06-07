import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import RolesCard from './rolesCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import {errorHandler} from '../utilities/errorHandler';
import { Link } from "react-router-dom";

class Roles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound : 0,
            roles: [],
            error: false,
            errorMsg: "",
            isRendered: true,
            roleID: 0
        }
        this.handleRender = this.handleRender.bind(this);
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/roles', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //Can't get response status code here, so the check is done in the .catch error handler
            this.setState({ roles: data });
            //console.log(data);
        })
        .catch(err => {
            const error = errorHandler(err);
            if(error[0] === true) {
                this.setState({error: error[1].error});
                this.setState({errorMsg: error[1].errorMsg})
            }
        });
      }

      componentDidUpdate(prevProps, prevState){
        if (prevState.isRendered !== this.state.isRendered) {
            this.state.roles = this.state.roles.filter(role =>{
                return role.ID !== this.state.roleID; //remove the role from the list
            })
            this.setState({isRendered: true});
          }
      }

      handleRender(ID) {
        this.setState({isRendered: false});
        this.setState({roleID : ID});
    }
  
  
    render() {
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (this.state.noneFound === true) {
            return <h3>Forbidden.</h3> 
        }
        if (!this.state.roles.length) {
            return <h3>Loading roles...</h3>
        }
        const cardList = this.state.roles.map(role => {
            return (
            <div style={{padding:"15px"}} key={role.ID}>
                <Col span={4}>
                {this.state.isRendered ?<RolesCard  isNotRendered={this.handleRender} {...role} />: null}
                </Col>
            </div>
            )
        });
        return (
            <>
            <Button type="primary" >
                <Link to="/roles/create">Create Role</Link>  
            </Button>
            <Row type="flex" justify="space-around">
                {cardList}
            </Row>
            </>
        );
    }
}
  
export default Roles;
