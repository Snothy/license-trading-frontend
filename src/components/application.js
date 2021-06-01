import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import ApplicationCard from './applicationCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            application: []
        }

    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        const id = this.props.match.params.id; //using withRouter, as useParams cannot be used within a class component
        //let { ID } = useParams();
        fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${id}`, {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(this.props.match.params);
            this.setState({ application: [data] });
            //console.log(this.state.user);
            console.log(data);
        })
        .catch(err => {
            if (err.status === 404) {
                this.setState( {noneFound: true});
            } else if (err.status === 403) { // FIX ERROR HANDLING PLS this is forbidden (no access)
                this.setState( {noneFound: true})
            }
            console.log("Error fetching application", err);
        });
      }
  
    render() {
        if (this.state.noneFound === true) {
            return <h3>Application not found.</h3> 
        }
        if (!this.state.application.length) {
            return <h3>Loading application...</h3>
        }
        return (
            <div style={{padding:"15px"}} key={this.state.application.ID}>
                <Col span={4}>
                    <Row type="flex" justify="space-around">
                    <ApplicationCard {...this.state.application[0]}/>
                    </Row>
                </Col>
            </div>
        );
    }
}
  
export default withRouter(Application);
