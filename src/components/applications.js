import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import ApplicationCard from './applicationCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

class Applications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            applications: []
        }
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/applications', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //console.log(data);
            //console.log(this.context.user.token);
            this.setState({ applications: data })
        })
        .catch(err => console.log("Error fetching applications", err));
      }
  
    render() {
      if (!this.state.applications.length) {
        return <h3>Loading applications...</h3>
      }
      const cardList = this.state.applications.map(application => {
        return (
          <div style={{padding:"15px"}} key={application.ID}>
            <Col span={4}>
              <ApplicationCard {...application} />
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
  
  export default Applications;
