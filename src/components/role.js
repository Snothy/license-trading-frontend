import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import RoleCard from './roleCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";

class Role extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            role: []
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
            } else if (err.status === 403) { // FIX ERROR HANDLING PLS this is forbidden (no access)
                this.setState( {noneFound: true})
            }
            console.log("Error fetching role", err);
        });
      }
  
      render() {
        if (this.state.noneFound === true) {
            return <h3>No role found.</h3> 
        }
        //console.log(!this.state.chats.length)
        if (!this.state.role.length) {
            return <h3>Loading role...</h3>
        }
        return (
            <div style={{padding:"15px"}} key={this.state.role.ID}>
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
