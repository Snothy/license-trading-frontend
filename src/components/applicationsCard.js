import React from 'react';
import { Card } from 'antd';
import { Link } from "react-router-dom";
import ApplicationCardIcon from './applicationCardIcon';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';


const { Meta } = Card;

class ApplicationsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selected: false //setting it as a state is fine, as the chat will not be there upon re-render 
      };
    
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }

  static contextType = UserContext; //define user context for class


  handleAccept() {
    //status - 1pending, 2accepted, 3rejected
  const data = { status: 2 };
  //console.log(JSON.stringify(data));
  fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${this.props.ID}/changeStatus`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.context.user.token 
      } 
  })
  .then(status)
  .then(json)
  .then(data => {
      //console.log(data);
      alert("Application accepted");
      
  })

  .catch(err => {
      console.log("Error updating status", err);
      alert("Unsuccessful");
      return
  });
  this.props.applicationStatus(2, this.props.ID);
}



handleReject() {
  //status - 1pending, 2accepted, 3rejected
const data = { status: 3 };
//console.log(JSON.stringify(data));
fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${this.props.ID}/changeStatus`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.context.user.token 
    } 
})
.then(status)
.then(json)
.then(data => {
    //console.log(data);
    alert("Application rejected");
    
})

.catch(err => {
    console.log("Error updating status", err);
    alert("Unsuccessful");
    return
});
this.props.applicationStatus(3, this.props.ID);
}



  //implement the status as an image?
  render() {
    return (
  
            <Card
            actions={[
                <ApplicationCardIcon type={this.props.status}
                    id={this.props.ID}/>,
                <ApplicationCardIcon type="AcceptApplication"
                    handleToggle={this.handleAccept} viewOnly = {this.props.viewOnly} id={this.props.ID} selected={this.state.selected}/>,
                <ApplicationCardIcon type="RejectApplication"
                    handleToggle={this.handleReject} viewOnly = {this.props.viewOnly} id={this.props.ID} selected={this.state.selected}/>
                ]}
                style={{ width: 450 }}
                hoverable={true}>
                          <Link to = {`applications/${this.props.ID}`} >
                <Meta title={this.props.company_name} />
                <p>Address: {this.props.address}</p>
                <p>Contact: {this.props.telephone_number}</p>
                <p>Status: {this.props.status}</p>
                </Link>
            </Card>
    );
  }
}

export default ApplicationsCard; 