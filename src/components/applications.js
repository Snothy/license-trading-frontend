import React, { useContext } from 'react';
import { Row, Col, Button } from 'antd';
import ApplicationsCard from './applicationsCard';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { Link } from "react-router-dom";
import {errorHandler} from '../utilities/errorHandler';

class Applications extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noneFound : 0,
            applications: [],
            error: false,
            errorMsg: "",
            updateStatus: false,
            applicationStatus: 1,
            applicationID: 0,
            viewOnly: true
        }
        this.handleRender = this.handleRender.bind(this);
    }

    static contextType = UserContext; //define user context for class
  
    componentDidMount() {
        fetch('https://opera-ski-3000.codio-box.uk/api/applications', {headers: {"Authorization": "Bearer " + this.context.user.token } })
        .then(status)
        .then(json)
        .then(data => {
            //Can't get response status code here, so the check is done in the .catch error handler
            this.setState({ applications: data });
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

      componentDidUpdate(prevProps, prevState){
        if (prevState.applicationStatus !== this.state.applicationStatus) {
            //this.setState({isRendered: true});
            //console.log(this.state.chats);
            //console.log(this.state.application);
            //this.state.application[0].application.status = this.state.applicationStatus;
            this.state.applications.filter(application =>{
                if(application.ID === this.state.applicationID){
                    return application.status = this.state.applicationStatus;
                }
            })
            this.setState({updateStatus: false});
            this.setState({applicationID: 0});

          }
      }

      handleRender(statusCode, ID) {
        //console.log(statusCode);
        //console.log(this.state.application[0]);
      this.setState({updateStatus:true})
      this.setState({applicationStatus : statusCode});
      this.setState({applicationID : ID});
    }
  
    render() {
        if (this.state.error) {
            return(
            <h1>{this.state.errorMsg}</h1>
            )}
        if (this.state.noneFound === true) {
            return (
                <>
                    <Button type="primary" >
                        <Link to="/applications/create">Create Application</Link>  
                    </Button>
                    <h3>No applications found.</h3> 
                </>
            )
        } 
        if (!this.state.applications.length) {
            return <h3>Loading applications...</h3>
        }
        const cardList = this.state.applications.map(application => {
            return (
            <div style={{padding:"15px"}} key={application.ID}>
                <Col span={4}>
                <ApplicationsCard viewOnly = {this.state.viewOnly} applicationStatus = {this.handleRender} {...application} />
                </Col>
            </div>
            )
        });
        return (
            <>
                <Button type="primary" >
                    <Link to="/applications/create">Create Application</Link>  
                </Button>
                <Row type="flex" justify="space-around">
                {cardList}
                </Row>
            </>
        );
        }
    }
  
    export default Applications;
