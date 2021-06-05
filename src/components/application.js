import React, { useContext } from 'react';
import { Row, Col } from 'antd';
import ApplicationCard from './applicationCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from "react-router";
import {errorHandler} from '../utilities/errorHandler';

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound: 0,
            application: [],
            error: false,
            errorMsg: "",
            updateStatus: false,
            applicationStatus: 1,
            viewOnly: true
        }
        this.handleRender = this.handleRender.bind(this);
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
        if(this.context.user.isAdmin || this.context.user.isStaff) {
            this.setState({viewOnly: false});
        }
      }


      handleRender(statusCode) {
          console.log(statusCode);
          console.log(this.state.application[0]);
        this.setState({updateStatus:true})
        this.setState({applicationStatus : statusCode});
      }

      componentDidUpdate(prevProps, prevState){
        if (prevState.applicationStatus !== this.state.applicationStatus) {
            //this.setState({isRendered: true});
            //console.log(this.state.chats);
            //console.log(this.state.application);
            this.state.application[0].application.status = this.state.applicationStatus;
            this.setState({updateStatus: false});

          }
      }

  
    render() {
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
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
                <ApplicationCard viewOnly = {this.state.viewOnly} applicationStatus = {this.handleRender} {...this.state.application[0]}/>
                    
                    </Row>
                </Col>
            </div>
        );
    }
}
  
export default withRouter(Application);
