import React, { useContext } from 'react';
import { Row, Col, Button, Input, Select } from 'antd';
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
            viewOnly: true,
            filter: "",
            statusFilter: 0
        }
        this.handleRender = this.handleRender.bind(this);
        this.filterUpdate = this.filterUpdate.bind(this);
        this.statusFilterUpdate = this.statusFilterUpdate.bind(this);
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
                //console.log(application.status);
                //console.log(this.state.applicationStatus);
                return application.status = this.state.applicationStatus;
            }
        })
        this.setState({updateStatus: false});
        this.setState({applicationID: 0});
        this.setState({applicationStatus: 0});

        }
    }

    handleRender(statusCode, ID) {
    //console.log(statusCode);
    //console.log(this.state.application[0]);
    this.setState({updateStatus:true})
    this.setState({applicationStatus : statusCode});
    this.setState({applicationID : ID});
    }

    filterUpdate(event) {
        this.setState( { filter: event.target.value } )
    }

    statusFilterUpdate(value, event) {
        this.setState( {statusFilter: value});
        //if value === 0 => no filtering by status
    }
  
    render() {
        const Option = Select;
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


        

        let filteredApplications;
        filteredApplications = this.state.applications.filter((application) => {
            return application.company_name.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1; //if the company name doesnt match the filter, we dont return it
            //set both the company_name and the filter input to lower case
        });

        filteredApplications = filteredApplications.filter((application) => {
            if(this.state.statusFilter === 0) {
                return application;
            }
            //console.log(application.status);
            //console.log(this.state.statusFilter);
            return application.status === this.state.statusFilter;
        });



        const cardList = filteredApplications.map(application => {
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
                <h1 style={{textAlign: 'center'}}>Search:</h1>
                <Row type="flex" justify="center" align="middle">
                <Input placeholder="Search for company name" type="text" value = {this.state.filter} onChange= {this.filterUpdate}
                    style = {{
                        width: 350,
                        display: 'inline-flex', justifyContent: 'center', alignItems: 'center'
                    }}/>






                <Row>
                <Select style={{width:"150px"}} defaultValue={0} onSelect={(value, event) => this.statusFilterUpdate(value, event)}>
                    <Option style={{width:"150px"}}key={0} value={0}>Select Status</Option>
                    <Option style={{width:"150px"}}key={1} value={1}>Pending</Option>
                    <Option style={{width:"150px"}}key={2} value={2}>Accepted</Option>
                    <Option style={{width:"150px"}}key={3} value={3}>Rejected</Option>
                </Select>
                </Row>





                </Row>
                <Row type="flex" justify="space-around">
                    {cardList}
                </Row>
            </>
        );
        }
    }
  
    export default Applications;
