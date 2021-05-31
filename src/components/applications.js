import React from 'react';
import { Row, Col } from 'antd';
import ApplicationCard from './applicationCard';

class Applications extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        applications: []
      }
    }
  
    componentDidMount() {
      this.setState({
        applications: require('../data/applications.json')
      })
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



/*
//Use rows of cards to display applications
const list = (
  <>
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Link to="/applications/1">
        <Card >
            <Meta title="Application1" description="info" />
        </Card>
      </Link>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
  </Row>  
  <Row type="flex" justify="space-around">
    <Col span={6}>
      <Card >
        <Meta title="Application2" description="info" />
      </Card>
    </Col>
    <Col span={6}>
      <Card >
       <Meta title="Application2" description="info" />  
      </Card>
    </Col>
    <Col span={6}>
      <Card >
         <Meta title="Application2" description="info" />
      </Card>
    </Col>
  </Row>  
  </>
);

function Applications(props) {
  return list;
}

export default Applications;
*/