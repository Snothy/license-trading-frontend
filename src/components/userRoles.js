import React from 'react';
import { Row, Col, Form, Select, Card } from 'antd';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import {errorHandler} from '../utilities/errorHandler';
import { withRouter } from "react-router";



class UserRoles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            roles: [],
            allRoles: [],
            error: false,
            errorMsg: "",
            isAssigned: false
        }
        this.handleOnAssign = this.handleOnAssign.bind(this);
        this.handleOnRemove = this.handleOnRemove.bind(this);
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        const id = this.props.match.params.id;
        //fetch users roles
        fetch(`https://opera-ski-3000.codio-box.uk/api/users/${id}/roles`, {headers: {"Authorization": "Bearer " + this.context.user.token } })
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

        //fetch list of all roles
        fetch('https://opera-ski-3000.codio-box.uk/api/roles', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //Can't get response status code here, so the check is done in the .catch error handler
            this.setState({ allRoles: data });
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
        if (prevState.isAssigned !== this.state.isAssigned) {
            //run the handler passed in by the parent component
            //console.log(prevState.isSubmitted);
            //console.log('b');
            //console.log(this.state.isSubmitted)
            //this.props.handleToggle(this.state.selected);
            this.setState( {isAssigned: false});
          }
      }




      handleOnAssign(value,event) {
        const data = {role_ID: value}
        const id = this.props.match.params.id;
        fetch(`https://opera-ski-3000.codio-box.uk/api/users/${id}/roles`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.user.token 
            }        
        })
        .then(status)
        .then(json)
        .catch(error => {
            alert("Assigning role failed");
            console.log(error);
        });  
        //get role from state.allRoles by ID and assign that role object to state.roles
        this.state.allRoles.filter(role =>{
            //console.log(role.ID);
            //console.log(data.role_ID);
            if(role.ID === data.role_ID) {
                this.state.roles.push(role);
                //console.log(this.state)
            }
            return true;
        })
        //console.log('assigned role obj v');
        //console.log(assignedRoleObj);
        //this.state.roles.push(assignedRoleObj);
        //console.log(this.state.roles);
        this.setState( { isAssigned: true } );
        alert("Role assigned");
      }



      handleOnRemove(value,event) {
        const data = {role_ID: value}
        const id = this.props.match.params.id;
        fetch(`https://opera-ski-3000.codio-box.uk/api/users/${id}/roles`, {
            method: "DELETE",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + this.context.user.token 
            }        
        })
        .then(status)
        .then(json)
        .catch(error => {
            alert("Assigning role failed");
            console.log(error);
        });  
        // eslint-disable-next-line
        this.state.roles = this.state.roles.filter(role =>{
            //console.log(role.ID);
            //console.log(data.role_ID);
            return role.ID !== data.role_ID;
            })
        this.setState( { isAssigned: false } );
        alert("Role removed");
    }



  
    render() {
        //console.log(this.state.roles.length);
        //console.log(this.state.roles);
        const { Option } = Select;
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (!this.state.roles.length) {
            return <h3>Loading roles...</h3>
        }
        const cardList = this.state.roles.map(role => {
            return (
            <div style={{padding:"15px"}} key={role.ID}>
                <Col span={4}>
                <Card
                style={{ width: 450 }}
                 hoverable={true}>
                    <p>{role.name}</p>
                </Card>
                </Col>
            </div>
            )
        });
        const assignRolesList = (
            <div style={{padding:"15px"}}>
                <h1>Assign roles:</h1>
                <Form>
                <Select style={{width:"150px"}} onSelect={(value, event) => this.handleOnAssign(value, event)}>
                {this.state.allRoles.map(role => (
                 <Option style={{width:"150px"}}key={role.ID} value={role.ID}>{role.name}</Option>
                ))}
                </Select>
                </Form>
            </div>
            );

        const removeRolesList = (
            <div style={{padding:"15px"}}>
                <h1>Remove roles:</h1>
                <Form>
                <Select style={{width:"150px"}} onSelect={(value, event) => this.handleOnRemove(value, event)}>
                {this.state.allRoles.map(role => (
                    <Option style={{width:"150px"}}key={role.ID} value={role.ID}>{role.name}</Option>
                ))}
                </Select>
                </Form>
            </div>
            );
        return (
            <Row type="flex" justify="space-around">
                {cardList}
                {assignRolesList}
                {removeRolesList}
            </Row>
        );
    }
}
  
export default withRouter(UserRoles);
