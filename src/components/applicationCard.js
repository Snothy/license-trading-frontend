import React from 'react';
import { Card, Image } from 'antd';
import ApplicationCardIcon from './applicationCardIcon';
import { status, json } from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

const { Meta } = Card;

class ApplicationCard extends React.Component {

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
    fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${this.props.application.ID}/changeStatus`, {
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
    this.props.applicationStatus(2);
  }


  
  handleReject() {
    //status - 1pending, 2accepted, 3rejected
  const data = { status: 3 };
  //console.log(JSON.stringify(data));
  fetch(`https://opera-ski-3000.codio-box.uk/api/applications/${this.props.application.ID}/changeStatus`, {
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
  this.props.applicationStatus(3);
}



  //implement the status as an image?
  render() {
    //console.log(this.props);
    //console.log(this.props);
    //let imgList;
    //sconsole.log(imgList.length);
    //console.log(this.props.images);
    const imgList = this.props.images.map(image => {
        const imgUrl = "https://opera-ski-3000.codio-box.uk".concat(image.imageURL);
        //console.log(imgUrl);
        return (
            <Image width={100} src={imgUrl}/>
        );
    })
    return (
        <Card
            style={{ width: 4500, heigth: 4500, paddingLeft: 200}}          
            hoverable={true}
            actions={[
                <ApplicationCardIcon type={this.props.application.status}
                    id={this.props.application.ID}/>,
                <ApplicationCardIcon type="AcceptApplication"
                    handleToggle={this.handleAccept} viewOnly = {this.props.viewOnly} id={this.props.application.ID} selected={this.state.selected}/>,
                <ApplicationCardIcon type="RejectApplication"
                    handleToggle={this.handleReject} viewOnly = {this.props.viewOnly} id={this.props.application.ID} selected={this.state.selected}/>
              ]}
              >
            <Meta title={this.props.application.company_name} />
            <p style={{ width: 400, heigth: 450}}>Address: {this.props.application.address}</p>
            <p>Postcode: {this.props.application.postcode}</p>
            <p>Contact: {this.props.application.telephone_number}</p>
            <p>Insurance Company: {this.props.application.insurance_company}</p>
            <p>Images: </p>
                {imgList}
        </Card>
    )

  }
}

export default ApplicationCard; 
